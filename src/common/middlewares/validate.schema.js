import { logger } from "../utils/logger.js";

export const validateSchema = (schema) => {
    return (req, res, next) => {
        const errors = [];

        // Validar req.body
        if (schema.body) {
            const result = schema.body.safeParse(req.body);
            if (!result.success) {
                errors.push(
                    ...result.error.errors.map(error => ({
                        field: `body.${error.path.join('.')}`,
                        message: error.message
                    }))
                );

                logger.error(`Validation Errors: ${JSON.stringify(errors, null, 2)}`);
            } else {
                req.body = result.data;
            }
            
        };

        // Validar req.params
        if (schema.params) {
            const result = schema.params.safeParse(req.params);
            if (!result.success) {
                errors.push(
                    ...result.error.errors.map(error => ({
                        field: `params.${error.path.join('.')}`,
                        message: error.message
                    }))
                );

                logger.error(`Validation Errors: ${JSON.stringify(errors, null, 2)}`);
            } else {
                req.params = result.data;
            }
        };


        if (errors.length > 0) return res.status(400).json({ error: errors });
        next();
    };
};