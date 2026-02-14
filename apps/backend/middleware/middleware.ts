import { prisma } from "@repo/db/client";
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface JwtPayload {
    id:  string
}


declare global {
    namespace Express {
    interface Request {
        user?: {
            id: string
        };
    }
    }
}

export const auth = async(req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if(authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];

        if(!token){
            res.status(401).json({
                success: false,
                message: "token not found"
            })
        } else {
            const jwt_scret = process.env.JWT_SECRET;
            if(!jwt_scret) {
                throw new Error("jwt secret not setup in env")
            } else {
                const decoded = jwt.verify(token, jwt_scret) as JwtPayload;
                const user = await prisma.user.findUnique({
                    where: {id: decoded.id},
                    select: {id: true}
                })

                if(!user) {
                    res.status(401).json({
                        success: false,
                        message: "user with that token not found"
                    })
                } else {
                    req.user = {
                        id: decoded.id
                    }
                    next()
                }
            }
        }
    }
    else {
        res.status(401).json({
            success: false,
            message: "invalid auth header"
        })
    }
}