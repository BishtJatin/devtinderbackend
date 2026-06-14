import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { feed } from "../controller/feedController.js";

const feedRouter = express.Router();


feedRouter.get('/feed',authMiddleware,feed);

export default feedRouter;