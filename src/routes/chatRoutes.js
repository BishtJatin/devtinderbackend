import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createConversation, getAllUserConversations, getMessages, sendMessage } from "../controller/chatController.js";

const chatRouter = express.Router();

chatRouter.post("/conversation/:friendId",authMiddleware,createConversation);
chatRouter.post("/message/:conversationId",authMiddleware,sendMessage);
chatRouter.get( "/message/:conversationId",authMiddleware,getMessages);
chatRouter.get( "/conversations",authMiddleware,getAllUserConversations);

export default chatRouter;