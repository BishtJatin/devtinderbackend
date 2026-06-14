import express from "express";

import { signUp, login, logout } from "../controller/authController.js";


const authRouter = express.Router();

authRouter.post("/signUp", signUp);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

export default authRouter;