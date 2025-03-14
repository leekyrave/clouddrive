const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for reg user
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user in the system and returns a token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for registration
 *                 example: "ivan123"
 *               password:
 *                 type: string
 *                 description: The password for the new user
 *                 example: "strongpassword123"
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "ivan123"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation error or other issues
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: Internal server error
 */
router.post('/register', UserController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in an existing user
 *     description: Logs in a user by verifying the username and password, and returns a token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for login
 *                 example: "ivan123"
 *               password:
 *                 type: string
 *                 description: The password for the user
 *                 example: "strongpassword123"
 *     responses:
 *       201:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success login"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "ivan123"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation error or other issues (e.g., incorrect credentials)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 
*/
router.post('/login', UserController.login);

module.exports = router;