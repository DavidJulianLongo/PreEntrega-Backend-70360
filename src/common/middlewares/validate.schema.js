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
            } else {
                req.params = result.data;
            }
        };

        //Validar req.query 
        if (schema.query) {
            const result = schema.query.safeParse(req.query);

            if (!result.success) {
                errors.push(
                    ...result.error.errors.map((err) => ({
                        field: `query.${err.path.join(".")}`,
                        message: err.message,
                    }))
                );
            } else {
                req.query = result.data;
            }
        }

        if (errors.length > 0) return res.status(400).json({ error: errors });
        next();
    };
};