import classNames from "classnames";
import { AudioFileIcon } from "../Icons/AudioFileIcon";
import { useState, useEffect } from "react";

type FileUploadFormProps = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
} & React.HTMLAttributes<HTMLFormElement>;

const FileUploadForm: React.FC<FileUploadFormProps> = ({
  className,
  file,
  setFile,
  onSubmit,
  ...props
}) => {

  return (
    <form
      id="file_submit_form"
      className={classNames(
        "flex flex-row justify-center items-center",
        className
      )}
      onSubmit={onSubmit}
      {...props}
    >
      <label
        htmlFor="file_input"
        className={classNames(
          "my-2 p-3 text-slate-50 bg-slate-500 hover:bg-slate-600",
          "flex flex-row items-center justify-center",
          "border-none rounded-l-xl",
          "transition-all ease-in-out cursor-pointer"
        )}
      >
        <AudioFileIcon className="fill-white h-9 mr-2" /> Select Audio File
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
          {file !== null && `Upload (File: ${file!.name})`}
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
    </form>
  );
};

export default FileUploadForm;
