import { Router } from 'express';
import { petController } from './pet.controller.js';
import { validateSchema } from '../../common/middlewares/validate.schema.js';
import { petMockSchema } from './petMock.schema.js';


const router = Router();

router.post('/mocks/:amount', validateSchema(petMockSchema), petController.createPetMock);

export default router;