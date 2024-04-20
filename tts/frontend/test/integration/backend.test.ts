import {
  request_transcription,
  TranscriptionStatus,
  TranscriptObjectType,
} from "../../src/api/backend";
import { readFileSync } from "node:fs";
import { PromiseResult } from "../../src/utils/promise";
import { test, expect } from "vitest";

const AUDIO_FILE_PATH = "test/resource/audio_gettysburg.wav";
test("Test overall integration with backend", {timeout: 60000}, async () => {

  expect(import.meta.env.VITE_BACKEND_ROUTE).not.toEqual(undefined);

  const audio_file = new File(
    [readFileSync(AUDIO_FILE_PATH) as BlobPart],
    "test.wav",
    { type: "audio/wav" }
  );
  const result: PromiseResult<
    {
      status: TranscriptionStatus;
      transcript: TranscriptObjectType | null;
    },
    string
  >[] = [];
  for await (const i of request_transcription(audio_file)) {
    result.push(i);
  }

  console.log(result)
  expect(result).toHaveLength(3);
  expect(result[0][0]).toEqual({ status: "UPLOADING", transcript: null });
  expect(result[0][1]).toBe(null);
  expect(result[1][0]).toEqual({ status: "TRANSCRIBING", transcript: null });
  expect(result[1][1]).toBe(null);
  expect(result[2][0]?.status).toEqual("COMPLETED");
  expect(result[2][0]?.transcript).not.toBe(null);
  expect(result[2][1]).toBe(null);
});
