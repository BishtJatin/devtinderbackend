import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { suggestReply } from "../controller/aiController.js";


const aiRouter = express.Router();

aiRouter.post("/ai/suggestion",authMiddleware,suggestReply)

export default aiRouter;