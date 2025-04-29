import { Router } from 'express';
import { petController } from './pet.controller.js';
import { validateSchema } from '../../common/middlewares/validate.schema.js';
import { petMockSchema, registerSchema } from './pet.schema.js';
import { objectIdParamsSchema } from '../../common/schemas/objectIdParams.schema.js';
import { authMiddleware } from '../../common/middlewares/auth.middleware.js';
import { authorization } from '../../common/middlewares/authorization.middleware.js';

const router = Router();

router.post('/mocks/:amount', validateSchema(petMockSchema), petController.createPetMock);
router.post('/register', validateSchema(registerSchema), authMiddleware, authorization("admin"), petController.create);
router.get('/', petController.getAll);
router.get('/:id', validateSchema(objectIdParamsSchema), petController.getOne);
router.put('/:id', validateSchema(objectIdParamsSchema), authMiddleware, authorization("admin"), petController.update);
router.delete('/:id', validateSchema(objectIdParamsSchema), authMiddleware, authorization("admin"), petController.remove);


export default router;