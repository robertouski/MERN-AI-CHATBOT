import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger-config.js";

const COOKIE_SECRET = process.env.COOKIE_SECRET || "secret"; 
config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET))

//remove it in production
app.use(morgan("dev"))
app.use("/api/v1", appRouter)

export default app;
