import { authService } from './auth.service.js';

class AuthController {

    async register(req, res) {
        try {
            const user = req.body;
            const newUser = await authService.register(user);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await authService.login(email, password);
            res.cookie('token', token, { httpOnly: true }, { maxAg: 360000 });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

export const authController = new AuthController();