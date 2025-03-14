import { chunkFile } from "@/utils";
import axios from "axios";

const API_URL = "http://localhost:3000/files";

const startUploadFile = async (file, progressCallback) => {
    try {
        const { data } = await axios.post(`${API_URL}/upload/start`,
            { filename: file.name, size: file.size },
            { headers: { Authorization: `Bearer ` + localStorage.jwt_token } }
        );

        const uploadId = data.uploadId;
        await uploadChunks(file, uploadId, progressCallback);
    } catch (error) {
        console.error("Error starting upload:", error);
        throw new Error('error uploading')
    }

    return true;
};

const uploadChunks = async (file, uploadId, progressCallback) => {
    const chunks = chunkFile(file);
    let previousProgress = 0;

    for (let i = 0; i < chunks.length; i++) {
        const formData = new FormData();
        formData.append("chunk", chunks[i]);
        formData.append("uploadId", uploadId);
        formData.append("chunkIndex", i);

        try {
            await axios.post(`${API_URL}/upload/chunk`, formData, {
                headers: { Authorization: `Bearer ` + localStorage.jwt_token }
            });

            const progress = Math.round(((i + 1) / chunks.length) * 100);
            progressCallback(progress - previousProgress);
            previousProgress = progress;
        } catch (error) {
            console.error(`Error uploading chunk ${i}:`, error);
            return;
        }
    }

    await completeUpload(uploadId, file.name);
};

const completeUpload = async (uploadId, filename) => {
    try {
        await axios.post(`${API_URL}/upload/complete`,
            { uploadId, filename },
            { headers: { Authorization: `Bearer ` + localStorage.jwt_token } }
        );

        alert("Upload completed successfully!");
    } catch (error) {
        console.error("Error completing upload:", error);
    }
};

const getUserFiles = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/all`, {
            headers: { Authorization: `Bearer ` + localStorage.jwt_token }
        });

        return data.files; 
    } catch (error) {
        console.error("Error fetching files:", error);
        return [];
    }
};

export { startUploadFile, getUserFiles };
