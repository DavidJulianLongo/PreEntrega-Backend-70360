import { logger } from "../utils/logger.js";

export const authorization = (role) => {
    return (req, res, next) => {
        if (!req.user){
            logger.debug("Authorization failed: user not authenticated");
            return res.status(401).json({ status: "Error", message: "You are not authenticated" });
        }

        if (req.user.role !== role){
            logger.debug(`Authorization failed: user role ${req.user.role} does not match required role ${role}`);
            return res.status(403).json({ status: "Error", message: "You are not authorized" });
        } 

        next();
    }

}