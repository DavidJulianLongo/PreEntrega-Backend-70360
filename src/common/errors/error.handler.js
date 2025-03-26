import { logger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = status === 500 ? "Something went wrong" : error.message;
    const stack = error.stack.split('\n').slice(1);

    const errorData = {
        status,
        method: req.method,
        path: req.originalUrl,
        message: error.message,
        files: stack,
    };

    if (status === 500) {
        logger.error(JSON.stringify(errorData, null, 2));
        return res.status(status).json({ Error: { status, message } });
    }

    logger.debug(JSON.stringify(errorData, null, 2));
    res.status(status).json({ Error: { status, message } });
};
