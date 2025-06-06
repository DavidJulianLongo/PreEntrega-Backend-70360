import { Router } from 'express';
import { authController } from '../auth/auth.controller.js';
import { validateSchema } from '../../common/middlewares/validate.schema.js';
import { loginSchema, registerSchema } from './auth.schemas.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), authController.register);
router.post('/login', validateSchema(loginSchema), authController.login);

export default router;