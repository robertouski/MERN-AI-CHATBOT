import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  if (!message) {
    return res.status(422).json({ message: "Message is required" });
  }

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered or Token malfunctioned" });
    const lastMessage = user.chats[user.chats.length - 1];
    if (
      lastMessage &&
      lastMessage.content === message &&
      lastMessage.role === "user"
    ) {
      return res.status(200).json({ chats: user.chats });
    }
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: chats,
    });
    const response = chatResponse.data.choices[0].message.content;
    user.chats.push({ role: "assistant", content: response });
    await user.save();
    res.status(200).json({
      chats: user.chats,
    });

  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};



export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //user token check
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered or Token malfunctioned" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permissions didn't match" });
    }
    return res.status(200).json({ message: "Ok", chats: user.chats });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};


export const deleteChats = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered or Token malfunctioned" });
    }
    //@ts-ignore
    user.chats = [];
    await user.save();  // Asegúrate de guardar el documento tras modificarlo.
    return res.status(200).json({ message: "Chats deleted successfully" });  // Envía una confirmación explícita.
  } catch (error) {
    console.error("Error deleting chats:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
