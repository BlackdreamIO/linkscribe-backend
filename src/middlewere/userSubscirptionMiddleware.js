import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userSubscirptionMiddleware = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).send({
            error: "No token provided",
            code: 401,
            usages: null,
            message: "No token provided",
        });
    }

    if (!req.headers.authorization) {
        return res.status(401).send({
            error: "Unauthorized",
            code: 401,
            usages: null,
            message: "Unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded.hasProVersion) {
            return res.status(403).send({
                error: "Subscirption Required",
                code: 403,
                usages: null,
                message: "Upgrade to Pro version required",
            });
        }

        // res.status(200).send({
        //     error: null,
        //     code: 200,
        //     usages: null,
        //     message: "Authenticated Successfully",
        // });

        return next();
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
}