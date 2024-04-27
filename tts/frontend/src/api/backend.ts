import axios from "axios";
import { PromiseResult, clean_await } from "../utils/promise";

const BACKEND_PATH = import.meta.env.VITE_BACKEND_ROUTE;
axios.defaults.baseURL = BACKEND_PATH;

const get_s3_presigned_upload_link = async (s3_bucket_object_key: string) => {
  // FIXME: handle error
  const res = await axios.post(`/get_presigned_upload_link`, {
    s3_bucket_object_key: s3_bucket_object_key,
  });
  return {
    url: res.data["url_data"]["url"],
    fields: res.data["url_data"]["fields"],
  };
};

const upload_file_from_s3_presigned_link = async (
  url: string,
  fields: { [key: string]: string },
  file: File
) => {
  const formData = new FormData();
  Object.entries(fields).forEach((e) => {
    formData.append(e[0], e[1]);
  });

  // const file_text = (await file.arrayBuffer());
  formData.append("file", file);
  return axios.post(url, formData);
};

export const upload_file_s3 = async (
  s3_bucket_object_key: string,
  file: File
) => {
  const { url, fields } = await get_s3_presigned_upload_link(
    s3_bucket_object_key
  );
  return await upload_file_from_s3_presigned_link(url, fields, file);
};

export const request_transcribe_object: (
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

export type TranscriptionStatus =
  | "INITIAL_STATUS"
  | "UPLOADING"
  | "TRANSCRIBING"
  | "COMPLETED"
  | "ERROR";

export type TranscriptObjectType = { end: number; start: number; text: string }[];

export async function* request_transcription(
  audio_file: File,
  audio_file_type: string = "audio/wav",
  s3_upload_object_key = "test.wav",
  request_polling_interval = 5000, //miliseconds
): AsyncGenerator<
  PromiseResult<{ status: TranscriptionStatus; transcript: TranscriptObjectType | null }, string>
> {
  console.log({BACKEND_PATH})
  yield [{ status: "UPLOADING", transcript: null }, null];
  if (audio_file === null || audio_file.type !== audio_file_type) {
    yield [null, "Invalid file type"];
    return;
  }
  let res, err;
  [res, err] = await clean_await(
    upload_file_s3(s3_upload_object_key, audio_file)
  );
  if (res === null) {
    yield [
      null,
      // @ts-expect-error this is the best we can do to get the error message
      `Something went wrong when uploading file: ${err?.message ?? err}`,
    ];
    return;
  }

  yield [{ status: "TRANSCRIBING", transcript: null }, null];

  [res, err] = await request_transcribe_object("test.wav");
  const job_id = res;
  if (job_id === null) {
    yield [
      null,
      `Something went wrong when requesting transcription: ${
        // @ts-expect-error this is the best we can do to get the error message
        err?.message ?? err
      }`,
    ];
    return;
  }

  [res, err] = await clean_await<string, string>(
    new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        const [status, error] = await request_transcription_status(job_id);
        if (status === null) {
          clearInterval(interval);
          reject(error);
        }
        if (status === "COMPLETED") {
          clearInterval(interval);
          resolve(status);
        }
      }, request_polling_interval);
    })
  );
  if (err !== null) {
    yield [null, err];
    return;
  }

  const [transcript, transcription_error] = await request_transcription_text(
    job_id
  );

  if (transcript === null) {
    yield [null, transcription_error];
  } else {
    yield [
      {
        status: "COMPLETED",
        transcript
      },
      null,
    ];
  }
}
