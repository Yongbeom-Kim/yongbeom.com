import classNames from "classnames";
import { AudioFileIcon } from "../Icons/AudioFileIcon";
import { shorten_file_name } from "../../utils/file_name_shortener";
import { useState, useEffect } from "react";
import sha256 from "crypto-js/sha256";
import { useTranscriptionService } from "../../hooks/transcribe";

type FileUploadFormProps = React.HTMLAttributes<HTMLFormElement>;

type FormState = "BEFORE_SUBMIT" | "SUBMITTED";

const FileUploadForm: React.FC<FileUploadFormProps> = ({
  className,
  ...props
}) => {
  const [formState, setFormState] = useState<FormState>("BEFORE_SUBMIT");
  const [file, setFile] = useState<File | null>(null);
  const [submitFile, setSubmitFile] = useState<File | null>(null);
  const [s3ObjKey, setS3ObjKey] = useState<string | null>(null);

  const { transcription, transcriptionState, transcriptionError } =
    useTranscriptionService(submitFile, s3ObjKey, "base", 5000);

  useEffect(() => {
    if (file === null) return;
    file.text().then(text => setS3ObjKey(sha256(text).toString() + ".wav"));
  }, [file]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitFile(file);
    setFile(null);
    setFormState("SUBMITTED");
  };

  const [textareaValue, setTextareaValue] = useState("");
  useEffect(() => {
    setTextareaValue(
      transcription?.map((t) => t.text).join("\n")
      ?? transcriptionError
      ?? transcriptionState
    )
  }, [transcription, transcriptionState, transcriptionError]);

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
              {
                "bg-slate-500 hover:bg-slate-600 cursor-pointer": file !== null,
              },
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

        {formState === "BEFORE_SUBMIT" && <div>Extra Parameters</div>}
        {formState === "SUBMITTED" && (
          <textarea
            value={textareaValue}
            readOnly
            className={classNames(
              "w-8/12 py-1 resize-none mx-auto mb-10 h-full border-slate-700 border-[1px] border-solid rounded-xl focus:outline-none active:outline-none",
              "bg-white disabled:bg-white",
              { "text-red-800": transcriptionError !== null }
            )}
          ></textarea>
        )}
      </form>
    </div>
  );
};

export default FileUploadForm;
