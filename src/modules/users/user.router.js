import { Router } from 'express';
import { userController } from './user.controller.js';

const router = Router();

router.get('/', userController.getAll);
router.post('/mocks/:amount', userController.createUsersMock);

export default router;