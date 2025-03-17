export const errorHandler = (error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = status === 500 ? "Something went wrong" : error.message; 
    res.status(status).json({ status: "Error", message: message });
};
