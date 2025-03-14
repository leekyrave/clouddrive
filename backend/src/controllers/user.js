const UserService = require('../services/user');

class UserController {
    static userService = UserService.getInstance();

    static async register(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "All field are required"
            });
        }

        try {
            const { user, token } = await UserController.userService.registerUser(username, password);

            return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user.id,
                    username: user.username
                },
                token
            }); 
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error: error.message
            })
        }
    }

    static async login(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "All field are required"
            });
        }

        try {
            const { user, token } = await UserController.userService.loginUser(username, password);

            return res.status(201).json({
                message: 'Success login',
                user: {
                    id: user.id,
                    username: user.username
                },
                token
            }); 
        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    }
}

module.exports = UserController;