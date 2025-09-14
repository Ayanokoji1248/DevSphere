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

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"

dotenv.config({ path: envFile });



app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// Handle preflight OPTIONS requests
app.options(/.*/, cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use((req, res, next) => {
  console.log("Incoming Origin:", req.headers.origin);
  console.log("Allowed Origin:", process.env.FRONTEND_URL);
  next();
});

app.use("/api/auth", authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/project', projectRouter)
app.use('/api/comment', commentRouter)
app.use('/api/ai', aiRouter)

export default app;