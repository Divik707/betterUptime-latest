import { Router } from "express";
import { prisma } from "@repo/db/client";
import type { Request, Response } from "express";
import { auth } from "../middleware/middleware";

const webRouter = Router();

webRouter.post('/register-website',auth, async(req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== "string" || !url.startsWith("http")) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid URL",
      });
    }

    const web = await prisma.website.create({
      data: {
        url,
        timestamp: new Date(),
        userId: req.user!.id 
      }
    });

    return res.status(201).json({
      success: true,
      message: "Website registered",
      website: {
        id: web.id,
        url: web.url,           
        timestamp: web.timestamp,
      },
    });
  } catch (error) {
    console.log("error while registering website", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

webRouter.get('/website:id',auth, async(req, res) => {
    try {
        const { id } = req.body;
        const website = prisma.website.findUnique({
            where: { id }
        })
        if(!website) {
            res.status(401).json({
                success: false,
                message: "website not found"
            })
        }
        res.status(201).json({
            success: true,
            message: "website found",
            website
        })

    } catch (error) {
        console.log("while finding the website",  error);
        res.status(401).json({
            success: false,
            message: "error encountered"
        })
    }
})

export default webRouter;