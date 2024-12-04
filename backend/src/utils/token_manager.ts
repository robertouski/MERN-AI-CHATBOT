import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
    return decoded;
  } catch (error) {
    console.log("Token verification failed", error);
    return res.status(401).json({ message: "Invalid token." });
  }
};

// export const verifyToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log("Im here")
//   const token = req.signedCookies[`${COOKIE_NAME}`];
//   console.log(token);

// };
