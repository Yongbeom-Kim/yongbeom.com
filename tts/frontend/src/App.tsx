import { useState } from "react";
import "./App.css";
import { request_transcribe_object, request_transcription_status, request_transcription_text, upload_file_s3 } from "./api/backend";

function App() {
  const [file, setFile] = useState<File | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log('Uploading file to S3...')
    if (file === null) return;
    await upload_file_s3('test.wav', file).then(() => {
      console.log('File uploaded successfully!')
    })
    console.log('Requesting transcription...')
    const {success, job_id, error} = await request_transcribe_object('test.wav')
    console.log({success, job_id, error})
    if (!success) return;
    console.log('Successfully requested transcription!')
    
    const interval = setInterval(async () => {
      console.log('Requesting transcription status...')
      const {success, status, error} = await request_transcription_status(job_id)
      console.log(`Transcription status`)
      console.log({success, status, error})
      if (success && status === 'COMPLETED') {
        console.log('Transcription completed!')
        clearInterval(interval)

        // Request text
        console.log('Requesting transcription text...')
        const {success: s, text, error: err} = await request_transcription_text(job_id);
        console.log('TT text...')
        console.log({success: s, text, error: err})
      }
    }, 5000);


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
