'use strict';
const { User } = require('../models/index');
const jwt = require('jsonwebtoken');

class UserService {
    static instance = null;

    static getInstance() {
        if (UserService.instance) {
            return UserService.instance;
        }

        UserService.instance = new UserService();
        return UserService.instance;
    }

    createJWTToken(user) {
        return jwt.sign({
            id: user.id,
            username: user.username
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRESIN
        });
    }

    async registerUser(username, password) {
        const existingUser = await User.findOne({
            where: {
                username: username
            }
        });

        if (existingUser) {
            throw new Error("Username already in use");
        }

        const hashedPassword = await User.hashPassword(password);
        const newUser = await User.create({
            username, password: hashedPassword
        });

        const token = this.createJWTToken(newUser);

        return {
            user: newUser,
            token
        };
    }

    async loginUser(username, password) {
        const existingUser = await User.findOne({
            where: {
                username: username
            }
        });
        console.log(existingUser);
        if (!existingUser) {
            throw new Error("Not registered");
        }

        const isPasswordSimilar = await existingUser.checkPassword(password);

        if (!isPasswordSimilar) {
            throw new Error("Uncorrect password");
        }
        
        const token = this.createJWTToken(existingUser);

        return {
            user: existingUser,
            token
        }
    }
}

module.exports = UserService;
