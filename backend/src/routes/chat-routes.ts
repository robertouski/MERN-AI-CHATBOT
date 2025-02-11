import { Router } from "express";
import { ChatCompletionValidators, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";
import { verifyToken } from "../utils/token_manager.js";

const chatRoutes = Router();

/**
 * @openapi
 *  /chat/new:
 *   post:
 *     tags:
 *       - Chat
 *     summary: Sends a new message and receives a response
 *     description: >
 *       Receives a message from a user, checks if it is the same as the last message. 
 *       If the message is new, it sends the message to OpenAI to generate a response,
 *       which is then added to the user's chat history.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: The user's message to be sent to the API.
 *     responses:
 *       200:
 *         description: Chat updated with the response from OpenAI.
 *       422:
 *         description: Message required but not provided.
 *       401:
 *         description: User not registered or token malfunction.
 *       500:
 *         description: Internal server error.
 */


chatRoutes.post("/new", validate(ChatCompletionValidators), verifyToken, generateChatCompletion)
/**
 * @openapi
 * /chat/all-chats:
 *   get:
 *     tags:
 *       - Chat
 *     summary: Retrieve all chat messages
 *     description: Returns all chat messages from the user's chat history.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all chat messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       401:
 *         description: Unauthorized, invalid or no token provided.
 *       500:
 *         description: Internal server error.
 */

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser)
/**
 * @openapi
 * /chat/delete:
 *   delete:
 *     tags:
 *       - Chat
 *     summary: Delete all chat messages
 *     description: Deletes all chat messages from the user's history, effectively clearing it.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deleted all chat messages.
 *       401:
 *         description: Unauthorized, invalid or no token provided.
 *       500:
 *         description: Internal server error.
 */

chatRoutes.delete("/delete", verifyToken, deleteChats)

export default chatRoutes;
