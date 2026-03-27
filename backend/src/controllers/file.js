const FileService = require('../services/file');

class FileController {
    static fileService = FileService.getInstance();

    static async startUpload(req, res) {
        try {
            const { filename, totalChunks, authorID } = req.body;
            const result = await FileController.fileService.startUpload(filename, totalChunks, authorID);
            res.json(result);
        } catch (error) {
            console.log(error)
            res.status(400).json({
                error: error.message
            })
        }
    }

    static async uploadChunk(req, res) {
        try {
            const { uploadId, chunkIndex } = req.body;
            const chunk = req.file.buffer;

            const result = await FileController.fileService.uploadChunk(uploadId, chunk, chunkIndex);

            res.json(result);
        } catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    }

    static async completeUpload(req, res) {
        try {
          const { uploadId, filename } = req.body;
          const result = await FileController.fileService.completeUpload(uploadId, filename, req.user.id);
          res.json(result);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
    }

    static async getFile(req, res) {
        try {
            const file = await FileController.fileService.getFile(req.params.id);
            res.sendFile(file.path, { root: '.' });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async deleteFile(req, res) {
        try {
            const result = await FileController.fileService.deleteFile(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(404).json({
                error: error.message
            })
        }
    }

    static async getFilesByUser(req, res) {
        try {
            const result = await FileController.fileService.getFileByUser(req.user.id);

            res.json(result);
        } catch (error) {
            res.status(404).json({
                error: error.message
            })
        }
    }
}

module.exports = FileController;