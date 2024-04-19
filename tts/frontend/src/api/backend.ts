import axios from "axios";

const BACKEND_PATH = import.meta.env.VITE_BACKEND_ROUTE

const get_s3_presigned_upload_link = async (s3_bucket_object_key: string) => {
    // FIXME: handle error
    const res = await axios.post(`${BACKEND_PATH}/get_presigned_upload_link`, {
        s3_bucket_object_key: s3_bucket_object_key,
      });
    return {
        url: res.data["url_data"]["url"],
        fields: res.data["url_data"]["fields"],
    }
}

const upload_file_from_s3_presigned_link = async (url: string, fields: {[key: string]: string}, file: File) => {
    const formData = new FormData();
    Object.entries(fields).forEach(e => {
        formData.append(e[0], e[1]);
    })


    // const file_text = (await file.arrayBuffer());
    formData.append("file", file);    
    return axios.post(url, formData);
}

export const upload_file_s3 = async (s3_bucket_object_key: string, file: File) => {

    const {url, fields} = await get_s3_presigned_upload_link(s3_bucket_object_key);
    return upload_file_from_s3_presigned_link(url, fields, file);

}

export const request_transcribe_object: ((s3_bucket_object_key: string) => Promise<{success: boolean, job_id: string, error: string}>) = async (s3_bucket_object_key: string) => {
    const res = await axios.post(`${BACKEND_PATH}/transcribe_object`, {'s3_bucket_object_key':s3_bucket_object_key});
    switch (res.status) {
        case 200:
            return {success: true, job_id: res.data["job_id"], error: ""}
        case 404:
            return {success: false, job_id: "", error: "File not found"}
        case 500:
            return {success: false, job_id: "", error: res.data["message"]}
    }
    return {success: false, job_id: "", error: `Unknown error, status code: ${res.status}, message: ${res.data["message"]}`}
}

export const request_transcription_status: ((job_id: string) => Promise<{success: boolean, status: string, error: string}>) = async (job_id: string) => {
    const res = await axios.get(`${BACKEND_PATH}/get_transcription_status`,{params:{job_id:job_id}});

    switch (res.status) {
        case 200:
            return {success: true, status: res.data["status"], error: ""}
        case 500:
            return {success: false, status: res.data["status"], error: res.data["message"]}
        default:
            return {success: false, status: "", error: `Unknown error, status code: ${res.status}, message: ${res.data["message"]}`}
    }
}

export const request_transcription_text: ((job_id: string) => Promise<{success: boolean, text: {end: number, start: number, text: string}[], error: string}>) = async (job_id: string) => {
    const res = await axios.get(`${BACKEND_PATH}/get_transcription`,{params:{job_id:job_id}});

    switch (res.status) {
        case 200:
            return {success: true, text: res.data["transcription"], error: ""}
        default:
            return {success: false, text: res.data["transcription"], error: `Error with status ${res.status}, message ${res.data["message"]}`}
    }
}