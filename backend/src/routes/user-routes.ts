import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controller.js";
import { loginValidators, signUpValidators, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token_manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup", validate(signUpValidators), userSignup)
userRoutes.post("/login", validate(loginValidators), userLogin)
userRoutes.get("/auth-status", verifyToken, verifyUser)
userRoutes.get("/logout", verifyToken, userLogout)


export default userRoutes;
