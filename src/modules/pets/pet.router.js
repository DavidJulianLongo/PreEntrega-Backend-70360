import { Router } from 'express';
import { petController } from './pet.controller.js';

const router = Router();

router.post('/mocks/:amount', petController.createPetMock);

export default router;