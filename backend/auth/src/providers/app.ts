import express, { Application, Response, Request } from "express";
import cookieSession from "cookie-session";
import dotenv from "dotenv"
import connectDb from "../db";
import router from "../routes";
import { errorHandler } from "../middlewares/error-handler";

const app: Application = express();

// Connect to MongoDB
connectDb();
dotenv.config();
// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Cookie session middleware
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production" // Set to true in production (requires HTTPS)
}));

// Routes
app.use("/", router);

// Error handler middleware
app.use(errorHandler);


export { app } ;