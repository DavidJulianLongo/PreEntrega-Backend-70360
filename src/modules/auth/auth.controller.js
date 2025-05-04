import { authService } from './auth.service.js';

class AuthController {

    async register(req, res, next) {
        try {
            const user = req.body;
            const newUser = await authService.register(user);
            res.status(201).json({status: "Success", message: "User register successful", payload: newUser});
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await authService.login(email, password);
            res.cookie('token', token, { httpOnly: true ,  signed: true, maxAg: 360000 });
            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            next(error);
        }
    }

}

export const authController = new AuthController();