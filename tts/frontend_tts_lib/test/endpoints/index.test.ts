import { set_backend_path } from "../../src";
import { upload_file_s3 } from "../../src/endpoints";

// TODO: backend path should be set in a global setup file, with separate values for local and prod backend
beforeEach(() => {
    set_backend_path("http://localhost:5000");
})

describe('test upload_file_s3', () => {
    it('should upload file to s3', async () => {
        const file = new File([''], 'file.txt');
        const progress_states: string[] = []
        const result = await upload_file_s3('file.txt', file, (progress) => progress_states.push(progress));
        expect(result).toEqual([null, null]);
        expect(progress_states).toEqual(['GETTING_LINK', 'UPLOADING', 'UPLOADED']);
    })
})