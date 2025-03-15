import { Router } from 'express';
import { petController } from './pet.controller.js';

const router = Router();

router.get('/mocks/:amount', petController.createPetMock);

export default router;