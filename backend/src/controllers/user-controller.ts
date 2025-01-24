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
    });
    return res
      .status(200)
      .json({ message: "Ok", name: user.name, lastname: user.lastname, email: user.email });
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
    const { name, lastname, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, lastname, email, password: hashedPassword });
    await user.save();
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
    });
    return res.status(201).json({ message: "Ok", id: user._id.toString(), name: user.name, lastname: user.lastname, email: user.email });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //user token check
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or Token malfunctioned" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permissions didn't match" });
    }
    return res
      .status(200)
      .json({ message: "Ok", name: user.name, lastname: user.lastname, email: user.email });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //user token check
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or Token malfunctioned" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permissions didn't match" });
    }

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: "Ok" });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export default { getAllUsers, userSignup, userLogin };
