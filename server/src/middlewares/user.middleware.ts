import { Request, Response, NextFunction } from "express";
import jwt, { decode, JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload;
        }
    }
}

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }

    const decoded = (jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload)

    req.user = decoded

    next()

}