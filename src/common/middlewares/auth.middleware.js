import { verifyToken } from "../utils/jwt.js";
import { AppError } from "../errors/appError.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.signedCookies.token;

        const decoded = verifyToken(token);
        if (!decoded) throw new AppError("User not authenticated, please login", 401);
        req.user = decoded;
        next()
    } catch (error) {
        next(error);
    }
}