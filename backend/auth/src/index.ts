import express, { Application, Response, Request } from "express";
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import connectDb from "./db";
import cookieSession from "cookie-session";
import dotenv from "dotenv"

const app: Application = express();
const port: number = 8000;

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

// Start server
app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});
