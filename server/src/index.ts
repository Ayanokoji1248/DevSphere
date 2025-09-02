import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import { dbConnect } from "./config/dbConnection";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
import cors from "cors"
import projectRouter from "./routes/project.route";
import commentRouter from "./routes/comment.route";
import aiRouter from "./routes/ai.route";
const app = express()

dotenv.config();

const allowedOrigins = [
    "http://localhost:3000",
    "https://dev-sphere-zeta.vercel.app",
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// Handle preflight OPTIONS requests
app.options("/", cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.use("/api/auth", authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/project', projectRouter)
app.use('/api/comment', commentRouter)
app.use('/api/ai', aiRouter)

export default app;