import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import { dbConnect } from "./config/dbConnection";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
import cors from "cors"
import projectRouter from "./routes/project.route";
const app = express()

dotenv.config();

// you should add origin here and other config too
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // this is most important because we are using cookie based authentication
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.use("/api/auth", authRouter)
app.use('/api/user/', userRouter)
app.use('/api/post/', postRouter)
app.use('/api/project', projectRouter)
async function main() {

    await dbConnect();
    app.listen(3000, () => {
        console.log("Server running on port 3000")
    })
}

main()