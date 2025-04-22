import { Router } from 'express';
import { petController } from './pet.controller.js';
import { validateSchema } from '../../common/middlewares/validate.schema.js';
import { petMockSchema, registerSchema } from './pet.schema.js';
import { objectIdParamsSchema } from '../../common/schemas/objectIdParams.schema.js';

const router = Router();

router.post('/mocks/:amount', validateSchema(petMockSchema), petController.createPetMock);
router.post('/register', validateSchema(registerSchema), petController.create);
router.get('/', petController.getAll);
router.get('/:id', validateSchema(objectIdParamsSchema), petController.getOne);
router.put('/:id', validateSchema(objectIdParamsSchema), petController.update);
router.delete('/:id', validateSchema(objectIdParamsSchema), petController.remove);


export default router;