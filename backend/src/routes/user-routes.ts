import { Router } from "express";
import { getAllUsers } from "../controllers/user-controller.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers)
export default userRoutes;
