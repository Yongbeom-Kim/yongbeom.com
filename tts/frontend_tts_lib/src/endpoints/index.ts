import axios from "axios";
import { clean_await, PromiseResult } from "../utils/utils";
import {
  get_s3_presigned_upload_link,
  upload_file_from_s3_presigned_link,
} from "./s3";

export type UPLOAD_STATE = "GETTING_LINK" | "UPLOADING" | "UPLOADED";
export const upload_file_s3 = async function (
  s3_bucket_object_key: string,
  file: File,
  onProgress: (progress: UPLOAD_STATE) => void = (() => {})
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

export const create_transcription_job: (
  s3_bucket_object_key: string
) => Promise<PromiseResult<string, string>> = async (
  s3_bucket_object_key: string
) => {
  const res = await axios.post(`/transcribe_object`, {
    s3_bucket_object_key: s3_bucket_object_key,
  });
  switch (res.status) {
    case 200:
      return [res.data["job_id"], null];
    case 404:
      return [null, "File not found"];
    case 500:
      return [null, res.data["message"]];
    default:
      return [
        null,
        `Unknown error, status code: ${res.status}, message: ${res.data["message"]}`,
      ];
  }
};

export const request_transcription_status: (
  job_id: string
) => Promise<PromiseResult<string, string>> = async (job_id: string) => {
  const res = await axios.get(`/get_transcription_status`, {
    params: { job_id: job_id },
  });

  switch (res.status) {
    case 200:
      return [res.data["status"], null];
    case 500:
      return [null, res.data["message"]];
    default:
      return [
        null,
        `Unknown error, status code: ${res.status}, message: ${res.data["message"]}`,
      ];
  }
};

export const request_transcription_text: (
  job_id: string
) => Promise<
  PromiseResult<{ end: number; start: number; text: string }[], string>
> = async (job_id: string) => {
  const res = await axios.get(`/get_transcription`, {
    params: { job_id: job_id },
  });

  switch (res.status) {
    case 200:
      return [res.data["transcription"], null];
    default:
      return [
        null,
        `Unknown error, status code: ${res.status}, message: ${res.data["message"]}`,
      ];
  }
};