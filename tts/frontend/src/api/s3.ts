import axios from "axios";

const get_presigned_upload_link = async (s3_bucket_object_key: string) => {
    // FIXME: handle error
    const res = await axios.post("/api/get_presigned_upload_link", {
        s3_bucket_object_key: s3_bucket_object_key,
      });
    return {
        url: res.data["url_data"]["url"],
        fields: res.data["url_data"]["fields"],
    }
}

const upload_file_from_presigned_link = async (url: string, fields: {[key: string]: string}, file: File) => {
    const formData = new FormData();
    Object.entries(fields).forEach(e => {
        formData.append(e[0], e[1]);
    })
    const file_text = (await file.text())!;
    formData.append("file", new Blob([file_text]));

    return axios.post(url, formData);
}

export const upload_file = async (s3_bucket_object_key: string, file: File) => {

    const {url, fields} = await get_presigned_upload_link(s3_bucket_object_key);
    return upload_file_from_presigned_link(url, fields, file);

}