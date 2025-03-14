import { chunkFile } from "@/utils";
import axios from "axios"

const uploadFile = async (file, progressCallback) => {
    const chunks = chunkFile(file);

    let previousProgress = 0;
    for (let i = 0; i < chunks.length; i++) {
        const formData = new FormData();

        formData.append('chunk', chunks[i]);
        formData.append('fileName', file.name);
        formData.append('chunkIndex', i);
        formData.append('totalChunks', chunks.length);

        try {
            const response = await axios.post('/api', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });


        } catch (e) {
            console.log(e);
        }
        const progress = Math.min(((i + 1) / chunks.length) * 100, 100)
        progressCallback(progress - previousProgress);

        previousProgress = progress;
    }
}

export {
    uploadFile
}