import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { userProfile, userProfileUpdate } from "../controller/userController.js";

const userRouter = express.Router();


userRouter.get('/profile',authMiddleware,userProfile);

userRouter.patch('/profile/update',authMiddleware,userProfileUpdate);

export default userRouter;