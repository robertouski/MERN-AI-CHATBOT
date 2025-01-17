import { Router } from "express";
import { ChatCompletionValidators, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";
import { verifyToken } from "../utils/token_manager.js";

const chatRoutes = Router();

chatRoutes.post("/new", validate(ChatCompletionValidators), verifyToken, generateChatCompletion)
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser)
chatRoutes.delete("/delete", verifyToken, deleteChats)

export default chatRoutes;
