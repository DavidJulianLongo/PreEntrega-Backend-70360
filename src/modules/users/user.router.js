import { Router } from 'express';
import { userController } from './user.controller.js';
import { validateSchema } from '../../common/middlewares/validate.schema.js';
import { userMockSchema } from './userMock.schema.js';
import { authMiddleware } from '../../common/middlewares/auth.middleware.js';

const router = Router();

router.get("/", userController.getAll);
router.post("/mocks/:amount", validateSchema(userMockSchema), userController.createUsersMock);
router.put("/update", authMiddleware, userController.update);
router.put("/restore-pass", authMiddleware, userController.restorePass);

export default router;