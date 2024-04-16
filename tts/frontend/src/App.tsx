import { useState } from "react";
import "./App.css";
import { upload_file } from "./api/s3";

function App() {
  const [file, setFile] = useState<File | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log('Uploading file to S3...')
    if (file === null) return;
    upload_file('test.wav', file).then(() => {
      console.log('File uploaded successfully!')
    })
  };

  return (
    <>
      <div>
        <form id="form" onSubmit={onSubmit}>
          <input
            type="file"
            name="file"
            id="file"
            form="form"
            onChange={(e) => setFile(e.target.files![0])}
          />
          <button type="submit" form="form">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
