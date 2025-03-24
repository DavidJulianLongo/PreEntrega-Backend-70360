import { logger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = status === 500 ? "Something went wrong" : error.message;
    const stack = error.stack.split('\n');
    const files = stack.slice(1);

    logger.error(`
        Status: ${status},
        Method: ${req.method},
        Path: ${req.originalUrl},
        Error: ${error.message},
        Files: ${files.join('\n')}
    `);
    res.status(status).json({ Error: { statusCode: status, message: message } });
};
