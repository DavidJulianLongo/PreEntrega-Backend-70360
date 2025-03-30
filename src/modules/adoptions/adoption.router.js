import { Router } from 'express';
import { adoptionController } from "./adoption.controller.js";
import { validateSchema } from '../../common/middlewares/validate.schema.js';
import { adoptionSchema} from './adoption.schema.js';
import { objectIdParamsSchema } from '../../common/utils/objectIdParams.schema.js';

const router = Router();

router.post("/", validateSchema(adoptionSchema), adoptionController.create);
router.get("/", adoptionController.getAll);
router.get("/:id", validateSchema(objectIdParamsSchema), adoptionController.getById);



export default router;