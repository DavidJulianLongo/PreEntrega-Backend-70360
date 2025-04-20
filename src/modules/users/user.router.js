import { Router } from 'express';
import { userController } from './user.controller.js';
import { validateSchema } from '../../common/middlewares/validate.schema.js';
import { userMockSchema } from './userMock.schema.js';
import { authMiddleware } from '../../common/middlewares/auth.middleware.js';
import { objectIdParamsSchema } from '../../common/utils/objectIdParams.schema.js';

const router = Router();

router.get("/", userController.getAll);
router.get("/:id",validateSchema(objectIdParamsSchema), userController.getOne);
router.post("/mocks/:amount", validateSchema(userMockSchema), userController.createUsersMock);
router.put("/update", authMiddleware, userController.update);
router.put("/restore-pass", authMiddleware, userController.restorePass);
router.delete("/:id", authMiddleware, userController.remove);

export default router;