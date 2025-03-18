export const errorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = status === 500 ? "Something went wrong" : error.message;
    const stack = error.stack.split('\n');
    const err = {
        statusCode: error.statusCode,
        files: stack,
        message: error.message,
        path: req.originalUrl,
        method: req.method,
    }
    console.log(err);
    res.status(status).json({ Error: { statusCode: status, message: message } });
};
