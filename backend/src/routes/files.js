const express = require('express');
const multer = require('multer');

const router = express.Router();
const FileController = require('../controllers/file');
const verifyJWT = require('../middlewares/jwt');

const upload = multer({
    storage: multer.memoryStorage()
});

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: API for file upload and retrieval
 */

/**
 * @swagger
 * /files/upload/start:
 *   post:
 *     summary: Start a file upload session
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: string
 *               size:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Upload session started successfully, returns uploadId
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

router.post('/upload/start', verifyJWT, FileController.startUpload);
/**
 * @swagger
 * /files/upload/chunk:
 *   post:
 *     summary: Upload a file chunk
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               uploadId:
 *                 type: string
 *               chunkIndex:
 *                 type: integer
 *               chunk:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Chunk uploaded successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/upload/chunk', verifyJWT, upload.single('chunk'), FileController.uploadChunk);

/**
 * @swagger
 * /files/upload/complete:
 *   post:
 *     summary: Complete the file upload
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uploadId:
 *                 type: string
 *     responses:
 *       200:
 *         description: File successfully assembled
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/upload/complete', verifyJWT, FileController.completeUpload);
/**
 * @swagger
 * /files/{id}:
 *   get:
 *     summary: Retrieve a file by ID
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *       404:
 *         description: File not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', verifyJWT, FileController.getFile);
/**
 * @swagger
 * /files/{id}:
 *   delete:
 *     summary: Delete a file by ID
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', verifyJWT, FileController.deleteFile);
/**
 * @swagger
 * /files/all:
 *   get:
 *     summary: Retrieve all files uploaded by the authenticated user
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of files retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/all', verifyJWT, FileController.getFilesByUser);

module.exports = router;