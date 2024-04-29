import classNames from "classnames";
import { AudioFileIcon } from "../Icons/AudioFileIcon";
import { shorten_file_name } from "../../utils/file_name_shortener";
import { useState, useEffect } from "react";
import sha256 from "crypto-js/sha256";
import {
  TranscriptionState,
  useTranscriptionService,
} from "../../hooks/transcribe";
import { RunpodModelConfig, RunpodTranscriptObjectType } from "frontend_tts_lib/types"
import { TranscriptionResultForm } from "./TranscriptionResultForm";
import { ModelConfigForm } from "./ModelConfigForm";

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
  const [modelConfig, setModelConfig] = useState<RunpodModelConfig | null>(null);

  const { transcription, transcriptionState, transcriptionError } =
    useTranscriptionService(submitFile, s3ObjKey, modelConfig, 5000);

  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    if (file === null) return;
    file.text().then((text) => setS3ObjKey(sha256(text).toString() + ".wav"));
  }, [file]);

  useEffect(() => {
    setTextareaValue(
      getDescriptionfromState(
        transcriptionState,
        transcriptionError,
        transcription
      )
    );
  }, [transcription, transcriptionState, transcriptionError]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitFile(file);
    setFile(null);
    setFormState("SUBMITTED");
    const data = new FormData(e.target as HTMLFormElement);
    const formObject = Object.fromEntries(data.entries());
    // @ts-expect-error fix this later
    const modelConfigObject = RunpodModelConfig.fromFormObject(formObject);
    setModelConfig(modelConfigObject);
  };

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
            onChange={(e) => {
              setFile(e.target.files![0] ?? null);
              setSubmitFile(null);
              setFormState("BEFORE_SUBMIT");
            }}
            className="fixed invisible"
          />
        </div>

        {formState === "BEFORE_SUBMIT" && <ModelConfigForm />}
        {formState === "SUBMITTED" && <TranscriptionResultForm hasError={transcriptionError !== null} text={textareaValue}/>}
      </form>
    </div>
  );
};

export default FileUploadForm;


function getDescriptionfromState(
  transcriptionState: TranscriptionState,
  transcriptionError: string | null,
  transcription: RunpodTranscriptObjectType[] | null
): string {
  switch (transcriptionState) {
    case "INITIAL_STATE":
      return "";
    case "GETTING_LINK":
    case "UPLOADING":
      return "Uploading audio file...";
    case "IN_PROGRESS":
    case "IN_QUEUE":
    case "UPLOADED":
      return "Transcribing audio...";
    case "ERROR":
    case "FAILED":
      return transcriptionError ?? "An error occurred";
    case "COMPLETED":
      return (
        transcription?.map((t) => t.text).join("\n") ??
        "No transcription available"
      );
  }
  // Typescript compiler happens otherwise
  throw new Error("Invalid transcription state");
}
