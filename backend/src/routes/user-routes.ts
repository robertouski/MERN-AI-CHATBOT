import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controller.js";
import { loginValidators, signUpValidators, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token_manager.js";

const userRoutes = Router();

/**
 * @openapi
 * /user/:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieve all users
 *     description: Returns a list of all registered users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Server error
 */

userRoutes.get("/", getAllUsers)
/**
 * @openapi
 * /user/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Validation error with input fields.
 *       500:
 *         description: Server error
 */

userRoutes.post("/signup", validate(signUpValidators), userSignup)
/**
 * @openapi
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: User login
 *     description: Logs in a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Unauthorized. Incorrect credentials.
 *       500:
 *         description: Server error
 */

userRoutes.post("/login", validate(loginValidators), userLogin)
/**
 * @openapi
 * /user/auth-status:
 *   get:
 *     tags:
 *       - User
 *     summary: Check authentication status
 *     description: Checks if the user's token is valid.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid.
 *       401:
 *         description: Unauthorized. Token is invalid.
 */

userRoutes.get("/auth-status", verifyToken, verifyUser)
/**
 * @openapi
 * /user/logout:
 *   get:
 *     tags:
 *       - User
 *     summary: User logout
 *     description: Logs out a user and invalidates the token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful.
 *       401:
 *         description: Unauthorized. Token is invalid.
 */

userRoutes.get("/logout", verifyToken, userLogout)


export default userRoutes;
