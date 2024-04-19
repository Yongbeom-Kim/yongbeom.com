import { useEffect, useState } from "react";
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
import { clean_await } from "./utils/promise";

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

  // TODO: convert to something testable.
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFile(null);

    setStatus("UPLOADING");
    setMessage("Uploading file...");
    if (file === null || file.type !== "audio/wav") {
      setStatus("ERROR");
      setErrorMessage("File must be of type audio/wav");
      return
    }

    const [r, err] = await clean_await(upload_file_s3("test.wav", file));
    if (r === null) {
      setStatus("ERROR");
      // @ts-expect-error error has any type, I can't do better than this.
      setErrorMessage(`Something went wrong: ${err?.message ?? err}`);
      return;
    }

    setStatus("TRANSCRIBING");
    setMessage("Requesting File Transcription...");
    const [job_id, error_msg] = await request_transcribe_object("test.wav");
    if (job_id === null) { // Second part satisfies typescript check.
      setStatus("ERROR");
      setErrorMessage(error_msg);
      return;
    }

    const interval = setInterval(async () => {
      const [status, error] = await request_transcription_status(
        job_id
      );
      if (status === null) {
        clearInterval(interval);
        setStatus("ERROR");
        setErrorMessage(error);
      }
      if (status === "COMPLETED") {
        clearInterval(interval);
        get_transcription_text(job_id);
      }
    }, 5000);


    async function get_transcription_text(job_id: string) {
      setMessage("Transcription Completed; Retrieving Transcription Text...");
      const [text, error] = await request_transcription_text(job_id);
      if (error !== null) {
        setStatus("ERROR");
        setErrorMessage(error);
        return
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
          "bg-white disabled:bg-white", 
          { "text-red-800": status === "ERROR" }
        )}
      ></textarea>
    </div>
  );
}

export default App;
