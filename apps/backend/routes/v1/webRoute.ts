import { Router } from "express";
import webRouter from "../../controller/websiteController";

const webRoutes = Router();

webRoutes.use('/v1/websites', webRouter);

export default webRoutes;