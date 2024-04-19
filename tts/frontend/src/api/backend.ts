import axios from "axios";
import { PromiseResult } from "../utils/promise";

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
    return  await upload_file_from_s3_presigned_link(url, fields, file);
}

export const request_transcribe_object: ((s3_bucket_object_key: string) => Promise<PromiseResult<string, string>>) = async (s3_bucket_object_key: string) => {
    const res = await axios.post(`${BACKEND_PATH}/transcribe_object`, {'s3_bucket_object_key':s3_bucket_object_key});
    switch (res.status) {
        case 200:
            return [res.data["job_id"], null]
        case 404:
            return [null, "File not found"]
        case 500:
            return [null, res.data["message"]]
        default:
            return [null, `Unknown error, status code: ${res.status}, message: ${res.data["message"]}`]
    }
}

export const request_transcription_status: ((job_id: string) => Promise<PromiseResult<string, string>>) = async (job_id: string) => {
    const res = await axios.get(`${BACKEND_PATH}/get_transcription_status`,{params:{job_id:job_id}});

    switch (res.status) {
        case 200:
            return [res.data["status"], null]
        case 500:
            return [null, res.data["message"]]
        default:
            return [null, `Unknown error, status code: ${res.status}, message: ${res.data["message"]}`]
    }
}

export const request_transcription_text: ((job_id: string) => Promise<PromiseResult<{end: number, start: number, text: string}[], string>>) = async (job_id: string) => {
    const res = await axios.get(`${BACKEND_PATH}/get_transcription`,{params:{job_id:job_id}});

    switch (res.status) {
        case 200:
            return [res.data["transcription"], null]
        default:
            return [null, `Unknown error, status code: ${res.status}, message: ${res.data["message"]}`]
    }
}