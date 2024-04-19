import requests

requests.request(
    'post',
    'https://dsidfry37tli7gkgxvlgl67cgy0okqyv.lambda-ul.us-east-1.on.aws/get_presigned_upload_link',
    headers={
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Linux\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"},
    data={"s3_bucket_object_key": "test.wav"}
)