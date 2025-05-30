import { Router } from 'express';
import { userController } from './user.controller.js';
import { validateSchema } from '../../common/middlewares/validate.schema.js';
import { userMockSchema } from './userMock.schema.js';
import { authMiddleware } from '../../common/middlewares/auth.middleware.js';
import { objectIdParamsSchema } from '../../common/schemas/objectIdParams.schema.js';
import { authorization } from '../../common/middlewares/authorization.middleware.js';

const router = Router();

router.post("/mocks/:amount", validateSchema(userMockSchema), userController.createUsersMock);
router.get("/", authMiddleware, authorization("admin"), userController.getAll);
router.get("/:id",authMiddleware, authorization("admin"), validateSchema(objectIdParamsSchema), userController.getOne);
router.put("/update", authMiddleware, userController.update);
router.put("/restore-pass", authMiddleware, userController.restorePass);
router.delete("/:id", authMiddleware, validateSchema(objectIdParamsSchema), authorization(["user", "admin"]), userController.remove);

export default router;