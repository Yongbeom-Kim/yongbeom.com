import { get_s3_presigned_upload_link, upload_file_from_s3_presigned_link } from "../../src/endpoints/s3";
import { set_backend_path } from "../../src/index";

beforeEach(() => {
    set_backend_path("http://localhost:5000");
})

describe('test get_s3_presigned_upload_link', () => {
    test('get_s3_presigned_upload_link returns url and fields', async () => {
        const [res, err] = await get_s3_presigned_upload_link("test.wav");
        expect(err).toBeNull();
        const {url, fields} = res!;
        expect(url).toContain("https://s3.amazonaws.com");
        expect(fields).toHaveProperty("AWSAccessKeyId")
        expect(fields).toHaveProperty("key")
        expect(fields).toHaveProperty("policy")
        expect(fields).toHaveProperty("signature")
    });
})

describe('test upload_file_from_s3_presigned_link', () => {
    test('upload_file_from_s3_presigned_link uploads file to s3', async () => {
        const [link_res, link_err] = await get_s3_presigned_upload_link("test.wav");
        expect(link_err).toBeNull();
        const {url, fields} = link_res!;
        const file = new File([""], "test.wav");
        const [upload_res, upload_err] = await upload_file_from_s3_presigned_link(url, fields, file);
        expect(upload_err).toBeNull();
    });
})