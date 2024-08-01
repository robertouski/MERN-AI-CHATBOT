import User from "../models/user.js";
import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Ok", users });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user signup
    const { username, email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return res.status(200).json({ message: "Ok", id: user._id.toString() });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export default { getAllUsers, userSignup };
