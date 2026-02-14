import { Router } from "express";
import userRouter from "../../controller/userController";

const userRoutes = Router();

userRoutes.use('/v1/user', userRouter);

export default userRoutes;