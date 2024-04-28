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

