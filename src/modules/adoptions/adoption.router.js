import { Router } from 'express';
import { adoptionController } from "./adoption.controller.js";
import { validateSchema } from '../../common/middlewares/validate.schema.js';
import { adoptionSchema} from './adoption.schema.js';
import { objectIdParamsSchema } from '../../common/schemas/objectIdParams.schema.js';
import { authorization } from '../../common/middlewares/authorization.middleware.js';
import { authMiddleware } from '../../common/middlewares/auth.middleware.js';

const router = Router();

router.post("/", validateSchema(adoptionSchema), authMiddleware, authorization("admin"), adoptionController.create);
router.get("/",authMiddleware, authorization("admin"), adoptionController.getAll);
router.get("/:id", validateSchema(objectIdParamsSchema), authMiddleware, authorization("admin"), adoptionController.getById);
router.delete("/:id", validateSchema(objectIdParamsSchema), authMiddleware, authorization("admin"), adoptionController.remove);



export default router;