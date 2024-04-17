import { useEffect, useReducer, useState } from "react";
import "./App.css";
import {
  request_transcribe_object,
  request_transcription_status,
  request_transcription_text,
  upload_file_s3,
} from "./api/backend";
import HeaderBar from "./component/HeaderBar/HeaderBar";
import DescriptionBar from "./component/DescriptionBar/DescriptionBar";
import FileUploadForm from "./component/FileUploadForm/FileUploadForm";
import classNames from "classnames";

type Status =
  | "INITIAL_STATUS"
  | "UPLOADING"
  | "TRANSCRIBING"
  | "COMPLETED"
  | "ERROR";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<
    { end: number; start: number; text: string }[]
  >([]);
  const [status, setStatus] = useState("INITIAL_STATUS" as Status);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFile(null);

    setStatus("UPLOADING");
    setMessage("Uploading file...");
    if (file === null || file.type !== "audio/wav") {
      setStatus("ERROR");
      setErrorMessage("File must be of type audio/wav");
    }
    await upload_file_s3("test.wav", file);

    setStatus("TRANSCRIBING");
    setMessage("Requesting File Transcription...");
    const { success, job_id, error } = await request_transcribe_object(
      "test.wav"
    );
    if (!success) {
      setStatus("ERROR");
      setErrorMessage(error);
    }

    const interval = setInterval(async () => {
      const { success, status, error } = await request_transcription_status(
        job_id
      );
      if (!success) {
        setStatus("ERROR");
        setErrorMessage(error);
      }
      if (success && status === "COMPLETED") {
        clearInterval(interval);
        get_transcription_text();
      }
    }, 5000);

    async function get_transcription_text() {
      setMessage("Transcription Completed; Retrieving Transcription Text...");
      const { success, text, error } = await request_transcription_text(job_id);
      if (!success) {
        setStatus("ERROR");
        setErrorMessage(error);
      }
      setStatus("COMPLETED");
      setTranscript(text);
    }
  };

  const [textareaValue, setTextareaValue] = useState("");
  useEffect(() => {
    if (status === "COMPLETED") {
      setTextareaValue(transcript.map((t) => t.text.trim()).join("\n"));
    } else if (status === "ERROR") {
      setTextareaValue(errorMessage);
    } else {
      setTextareaValue(message);
    }
  }, [status, transcript, errorMessage, message]);
  // TODO: Clean up textarea and classes, separate into its own component
  return (
    <div className="relative h-screen w-screen scroll-x-auto flex flex-col">
      <HeaderBar className="px-20 h-20 bg-slate-700" />
      <DescriptionBar className="px-20 py-10" />
      <FileUploadForm file={file} setFile={setFile} onSubmit={onSubmit} />
      <textarea
        value={textareaValue}
        readOnly
        className={classNames(
          "w-8/12 py-1 resize-none mx-auto mb-10 h-full border-slate-700 border-[1px] border-solid rounded-xl focus:outline-none active:outline-none",
          { "text-red-800": status === "ERROR" }
        )}
      ></textarea>
    </div>
  );
}

export default App;
