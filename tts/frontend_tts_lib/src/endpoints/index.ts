import { PromiseResult } from "../utils/utils";
import { create_transcription_job, Milliseconds, ModelType, request_transcription_text, TranscriptionStatus, TranscriptObjectType, wait_until_transcription_completed } from "./runpod";
import {
  get_s3_presigned_upload_link,
  upload_file_from_s3_presigned_link,
} from "./s3";

export type UploadStatus = "GETTING_LINK" | "UPLOADING" | "UPLOADED";
export const upload_file_s3 = async function (
  s3_bucket_object_key: string,
  file: File,
  onProgress: (progress: UploadStatus) => void = (() => {})
): Promise<PromiseResult<null, string>> {

  onProgress("GETTING_LINK");
  const [link_result, link_error] = await get_s3_presigned_upload_link(
    s3_bucket_object_key
  );
  if (link_error) {
    return [null, `Error during getting presigned s3 link: ${link_error}`];
  }

  onProgress("UPLOADING");
  const { url, fields } = link_result!;
  const [_, upload_error] = await upload_file_from_s3_presigned_link(
    url,
    fields,
    file
  );
  if (upload_error) {
    return [null, `Error during uploading file to s3: ${upload_error}`];
  }

  onProgress("UPLOADED");
  return [null, null];
};


export const transcribe_audio = async function (
  audio_download_url: string,
  model: ModelType = "base",
  onProgress: (progress: TranscriptionStatus) => void = (() => {}),
  queryInterval: Milliseconds = 1000
): Promise<PromiseResult<TranscriptObjectType[], string>> {
  const [job_id, job_error] = await create_transcription_job(
    audio_download_url,
    model
  );
  if (job_error) {
    return [null, `Error during creating transcription job: ${job_error}`];
  }
  onProgress("IN_PROGRESS");
  
  await wait_until_transcription_completed(job_id!, queryInterval, onProgress);

  const [trans_obj, trans_obj_err] = await request_transcription_text(job_id!)
  if (trans_obj_err) {
    return [null, `Error during getting transcription: ${trans_obj_err}`];
  }
  return [trans_obj!, null];
}