import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";

config();

const app = express();

app.use(express.json());

app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(middleware.route);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(handler.route);
      }
    });
  }
});


//remove it in production
app.use(morgan("dev"))
app.use("/api/v1", appRouter)

export default app;
