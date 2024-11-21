import User from "../models/user.js";
import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token_manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

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

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("user trying to login");
    //user login
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    //create and store cookie and send response
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Ok", id: user._id.toString() });
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
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: "Ok", id: user._id.toString() });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export default { getAllUsers, userSignup, userLogin };
