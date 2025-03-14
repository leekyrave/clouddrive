const { File } = require('../models/index');
const fs = require('fs');
const path = require('path');

class FileService {
    static instance = null;

    static getInstance() {
        if (FileService.instance) {
            return FileService.instance;
        }

        FileService.instance = new FileService();
        console.log(FileService.instance)
        return FileService.instance;
    }

    async startUpload(fileName, totalChunks, authorID) {
        const uploadId = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
        const tempPath = path.join(__dirname, `../uploads/${uploadId}.part`);
        
        fs.writeFileSync(tempPath, '');

        return {
            uploadId,
            fileName,
            totalChunks,
            authorID
        }
    }

    async uploadChunk(uploadId, chunk, chunkIndex) {
        const tempPath = path.join(__dirname, `../uploads/${uploadId}.part`);

        fs.appendFileSync(tempPath, chunk);

        return true;
    }

    async completeUpload(uploadId, filename, authorID) {
        const tempPath = path.join(__dirname, `../uploads/${uploadId}.part`);
        const finalPath = path.join(__dirname, `../uploads/${uploadId}-${filename}`);

        fs.renameSync(tempPath, finalPath);

        const newFile = await File.create({
            filename,
            path: finalPath,
            mimetype: 'application/octet-stream',
            size: fs.statSync(finalPath).size,
            uploadedAt: new Date(),
            author_id: authorID
        })

        return newFile;
    }

    async getFile(id) {
        const file = await File.findByPk(id);

        if(!file)
            throw new Error("No file");

        return file;
    }

    async getFileByUser(userID) {
        const files = await File.findAll({
            where: {
                author_id: userID
            }
        });

        if (!files)
            throw new Error("No files");
        
        return files;
    }

    async deleteFile(id) {
        const file = await File.findByPk(id);

        if(!file)
            throw new Error("No file");

        fs.unlinkSync(file.path);
        await file.destroy();

        return true;
    }
}

module.exports = FileService;
