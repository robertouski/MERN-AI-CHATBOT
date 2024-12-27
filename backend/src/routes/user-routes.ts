import { Router } from "express";
import { getAllUsers, userLogin, userSignup, verifyUser } from "../controllers/user-controller.js";
import { loginValidators, signUpValidators, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token_manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup", validate(signUpValidators), userSignup)
userRoutes.post("/login", validate(loginValidators), userLogin)
userRoutes.get("/auth-status", verifyToken, verifyUser)


export default userRoutes;
