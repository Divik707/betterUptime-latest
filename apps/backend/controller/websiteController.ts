import { Router } from "express";
import { prisma } from "@repo/db/client";

const webRouter = Router();

webRouter.post('/post', async(req, res) => {
    try {
        const { url } = req.body;
        await prisma.website.create({
            data: {
                url,
                timestamp: new Date()
            }
        });
        res.json({
            message: "website registered"
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
})

webRouter.get('/website:id', async(req, res) => {
    try {
        
    } catch (error) {
        
    }
})

export default webRouter;