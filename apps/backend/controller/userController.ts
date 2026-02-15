import { prisma } from "@repo/db/client";
import { Router } from "express";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

const userRouter = Router();

userRouter.post('/user-signup', async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.create({
            data: {
                username,
                password: await bcrypt.hash(password, 10)
            }
        })
        res.status(200).json({
                message: "user created",
                username
        }) 
    } catch (error) {
        console.log(error)
        res.json({
            message: error
        })
    }
})
userRouter.post('/user-signin', async(req, res) => {
    try {
        const { username, password } = req.body;
        if(!username && !password || !username || !password ) {
            res.status(401).json({
                success: false,
                message: "invalid input for signin"
            })
        }
        const userExist = await prisma.user.findFirst({
            where: { username } 
        });
        if(!userExist) {
            res.status(401).json({
                messgae:"username not found"
            })
        } else {
            if(await bcrypt.compare(password, userExist.password)) {
                if(!process.env.JWT_SECRET) {
                    res.json({
                        message:"token secret not found" 
                    })
                    return;
                }
                const token = jwt.sign({id: userExist.id}, process.env.JWT_SECRET,{expiresIn: '3d'} )
                res.status(201).json({
                    success:true,
                    token
                })
            }
            else {
                res.status(401).json({
                    success: false,
                    message: "incorrect password"
                })
            }
        }

    } catch (error) {
        
    }
})

export default userRouter;