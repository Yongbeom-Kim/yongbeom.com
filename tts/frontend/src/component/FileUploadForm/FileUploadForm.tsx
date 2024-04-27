import classNames from "classnames";
import { AudioFileIcon } from "../Icons/AudioFileIcon";
import { shorten_file_name } from "../../utils/file_name_shortener";
import { useState, useEffect } from "react";
import { TranscriptObjectType, request_transcription } from "../../api/backend";
import sha256 from 'crypto-js/sha256';

type FileUploadFormProps = React.HTMLAttributes<HTMLFormElement>;

type FormState = 'BEFORE_SUBMIT' | 'SUBMITTED';

const FileUploadForm: React.FC<FileUploadFormProps> = ({
  className,
  ...props
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<TranscriptObjectType>([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState<FormState>('BEFORE_SUBMIT');

  // TODO: convert to something testable.
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const upload_file = file;
    setFile(null);
    setTranscript([]);
    setErrorMessage("");
    setMessage("");
    setStatus('SUBMITTED');

    if (!upload_file) {
      return;
    }
    
    const it = await request_transcription(upload_file, sha256(await upload_file.text()).toString() + '.wav');

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

  return (
    <div className="w-full h-full flex flex-col">
      <form
        id="file_submit_form"
        className={classNames(
          "w-full h-full flex flex-col justify-start items-center",
          className
        )}
        onSubmit={onSubmit}
        {...props}
      >
        <div className="flex flex-row justify-center items-center">

        <label
          htmlFor="file_input"
          className={classNames(
            "my-2 p-3 text-slate-50 bg-slate-500 hover:bg-slate-600",
            "flex flex-row items-center justify-center",
            "border-none rounded-l-xl",
            "transition-all ease-in-out cursor-pointer"
          )}
        >
          <AudioFileIcon className="fill-white h-9 mr-2" /> Select File
        </label>
        <button
          type="submit"
          form="file_submit_form"
          className={classNames(
            "my-2 p-3 text-slate-50",
            "flex flex-row items-center justify-center",
            "border-none rounded-r-xl",
            "transition-all ease-in-out",
            { "bg-slate-500 hover:bg-slate-600 cursor-pointer": file !== null },
            { "bg-slate-400 cursor-default": file === null }
          )}
          disabled={file === null}
        >
          <div className="h-9 flex flex-row items-center justify-center">
            {file === null && "Upload File"}
            {file !== null &&
              `Upload (File: ${shorten_file_name(file!.name, 9)})`}
          </div>
        </button>
        <input
          type="file"
          name="file_input"
          id="file_input"
          form="file_submit_form"
          onChange={(e) => setFile(e.target.files![0] ?? null)}
          className="fixed invisible"
        />
        </div>

      {status==='BEFORE_SUBMIT' && <div>
        Extra Parameters
      </div>}
      {status==='SUBMITTED' && <textarea
        value={textareaValue}
        readOnly
        className={classNames(
          "w-8/12 py-1 resize-none mx-auto mb-10 h-full border-slate-700 border-[1px] border-solid rounded-xl focus:outline-none active:outline-none",
          "bg-white disabled:bg-white",
          { "text-red-800": errorMessage !== "" }
        )}
      ></textarea>}
      </form>

    </div>
  );
};

export default FileUploadForm;
