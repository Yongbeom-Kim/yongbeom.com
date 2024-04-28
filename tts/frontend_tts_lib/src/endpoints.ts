import axios from "axios";

export const get_s3_presigned_upload_link = async (
  s3_bucket_object_key: string
) => {
  // FIXME: handle error
  const res = await axios.post(`/get_presigned_upload_link`, {
    s3_bucket_object_key: s3_bucket_object_key,
  });
  return {
    url: res.data["url_data"]["url"],
    fields: res.data["url_data"]["fields"],
  };
};
