import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getConnection, reviewRequest, sendRequest, getPendingRequests } from "../controller/connectionController.js";

const connectionRouter = express.Router();

connectionRouter.post(
  "/send/:status/:toUserId",
  authMiddleware,
  sendRequest
);

connectionRouter.post(
  "/review/:status/:requestId",
  authMiddleware,
  reviewRequest
);

connectionRouter.get('/connection',authMiddleware,getConnection);

connectionRouter.get('/requests/received',authMiddleware,getPendingRequests);

export default connectionRouter;