import { Router } from "express";
import { ChatCompletionValidators, validate } from "../utils/validators.js";
import { generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";
import { verifyToken } from "../utils/token_manager.js";

const chatRoutes = Router();

chatRoutes.post("/new", validate(ChatCompletionValidators), verifyToken, generateChatCompletion)
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser)

export default chatRoutes;
