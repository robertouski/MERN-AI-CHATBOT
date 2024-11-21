import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controller.js";
import { loginValidators, signUpValidators, validate } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup", validate(signUpValidators), userSignup)
userRoutes.post("/login", validate(loginValidators), userLogin)


export default userRoutes;
