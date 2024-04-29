import axios, { AxiosError } from "axios";
import { format_axios_error, PromiseResult } from "../utils/utils";

export type TranscriptionStatus =
  | "ERROR"
  | "COMPLETED"
  | "IN_PROGRESS"
  | "IN_QUEUE"
  | "FAILED";

export type ModelType =
  | "tiny"
  | "base"
  | "small"
  | "medium"
  | "large-v1"
  | "large-v2";

export type SupportedLanguages = 'af' | 'ar' | 'hy' | 'az' | 'be' | 'bs' | 'bg' | 'ca' | 'zh' | 'hr' | 'cs'| 'da' | 'nl' | 'en' | 'et' | 'fi' | 'fr' | 'gl' | 'de' | 'el' | 'he' | 'hi' | 'hu' | 'is' | 'id' | 'it' | 'ja' | 'kn' | 'kk' | 'ko' | 'lv' | 'lt' | 'mk' | 'ms' | 'mr' | 'mi' | 'ne' | 'no' | 'fa' | 'pl' | 'pt' | 'ro' | 'ru' | 'sr' | 'sk' | 'sl' | 'es' | 'sw' | 'sv' | 'tl' | 'ta' | 'th' | 'tr' | 'uk' | 'ur' | 'vi' | 'cy';

export const create_transcription_job = async function (
  audio_download_url: string,
  model: ModelType = "base",
  language: SupportedLanguages | undefined = undefined,
  temperature: number = 0,
  best_of: number = 5,
  beam_size: number = 5,
  patience: number = 1,
  suppress_tokens: string = '-1',
  initial_prompt: string = '',
  condition_on_previous_text: boolean = false,
  temperature_increment_on_fallback: number = 0.2,
  compression_ratio_threshold: number = 2.4,
  logprob_threshold: number = -1,
  word_timestamps: boolean = false,
  no_speech_threshold: number = 0.6,
): Promise<PromiseResult<string, string>> {
  try {
    const res = await axios.post(
      `/transcribe_audio`,
      {
        audio_download_url,
        model,
        language,
        temperature,
        best_of,
        beam_size,
        patience,
        suppress_tokens,
        initial_prompt,
        condition_on_previous_text,
        temperature_increment_on_fallback,
        compression_ratio_threshold,
        logprob_threshold,
        word_timestamps,
        no_speech_threshold,
      },
      { validateStatus: (status: number) => status === 200 }
    );
    return [res.data["job_id"], null];
  } catch (e: unknown) {
    if (!(e instanceof AxiosError)) throw e;
    return [null, format_axios_error(e)];
  }
};

const request_transcription_status = async function (
  job_id: string
): Promise<PromiseResult<TranscriptionStatus, string>> {
  try {
    const res = await axios.get(`/get_transcription_status`, {
      params: { job_id: job_id },
      validateStatus: (status: number) => status === 200,
    });
    return [res.data["status"], null];
  } catch (e: unknown) {
    if (!(e instanceof AxiosError)) throw e;
    return [null, format_axios_error(e)];
  }
};

export type TranscriptObjectType = {
  end: number;
  start: number;
  text: string;
};

export const request_transcription_text: (
  job_id: string
) => Promise<PromiseResult<TranscriptObjectType[], string>> = async (
  job_id: string
) => {
  try {
    const res = await axios.get(`/get_transcription`, {
      params: { job_id: job_id },
      validateStatus: (status: number) => status === 200,
    });
    return [res.data["transcription"], null];
  } catch (e: unknown) {
    if (!(e instanceof AxiosError)) throw e;
    return [null, format_axios_error(e)];
  }
};

export type Milliseconds = number;

export const wait_until_transcription_completed = async function (
  job_id: string,
  queryInterval: Milliseconds = 500,
  onProgress: (progress: TranscriptionStatus) => void = () => {}
): Promise<PromiseResult<void, string>> {
  const [error, error_msg] = await new Promise<[boolean, string]>(
    (resolve) => {
      const interval = setInterval(async () => {
        const [status, status_error] = await request_transcription_status(
          job_id
        );
        onProgress(status ?? "FAILED");
        if (status === "FAILED" || status_error) {
          clearInterval(interval);
          resolve([true, status_error ?? "Transcription failed."]);
        }
        if (status === "COMPLETED") {
          clearInterval(interval);
          resolve([false, ""]);
        }
      }, queryInterval);
    }
  );
  if (error) {
    return [null, error_msg];
  }
  return [undefined, null];
};

export const TEST_EXPORTS = {
  request_transcription_status,
};
