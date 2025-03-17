import { Router } from 'express';
import { userController } from './user.controller.js';
import { validateSchema } from '../../common/middlewares/validate.schema.js';
import { userMockSchema } from './userMock.schema.js';

const router = Router();

router.get('/', userController.getAll);
router.post('/mocks/:amount', validateSchema(userMockSchema), userController.createUsersMock);

export default router;