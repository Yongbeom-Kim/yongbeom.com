import { useEffect, useState } from "react";
import "./App.css";
import {
  TranscriptObjectType,
  request_transcription
} from "./api/backend";
import HeaderBar from "./component/HeaderBar/HeaderBar";
import DescriptionBar from "./component/DescriptionBar/DescriptionBar";
import FileUploadForm from "./component/FileUploadForm/FileUploadForm";
import classNames from "classnames";


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<TranscriptObjectType>([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: convert to something testable.
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const upload_file = file;
    setFile(null);
    setTranscript([]);
    setErrorMessage("");
    setMessage("");

    if (!upload_file) {
      return;
    }

    const it = await request_transcription(upload_file)

    for await (const [res, err] of it) {
      if (res === null) {
        setErrorMessage(err ?? ""); // This nullary will never happen since only one can be null.
        return;
      }
      const { status, transcript } = res;
      setMessage(status);
      if (transcript !== null) {
        setTranscript(transcript);
      }
    }

  };

  const [textareaValue, setTextareaValue] = useState("");
  useEffect(() => {
    // console.log({transcript, errorMessage, message})
    if (transcript.length !== 0) {
      setTextareaValue(transcript.map((t) => t.text.trim()).join("\n"));
    } else if (errorMessage !== null && errorMessage !== "") {
      setTextareaValue(errorMessage);
    } else {
      setTextareaValue(message);
    }
  }, [transcript, errorMessage, message]);

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
