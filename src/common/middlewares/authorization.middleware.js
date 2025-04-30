import { logger } from "../utils/logger.js";

export const authorization = (roles) => {
    return (req, res, next) => {
        if (!req.user){
            logger.debug("Authorization failed: user not authenticated");
            return res.status(401).json({ Error: { status: 401, message: "You are not authenticated, please login" } });
        }

        const allowedRoles = Array.isArray(roles) ? roles : [roles];

        if (!allowedRoles.includes(req.user.role)){
            logger.debug(`Authorization failed: user role ${req.user.role} is not in allowed roles [${allowedRoles.join(", ")}]`);
            return res.status(403).json({ Error: { status: 403, message: "You are not authorized" } });
        } 

        next();
    }

}