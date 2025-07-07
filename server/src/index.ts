import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
const app = express()

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use("/api/auth", authRouter)


app.listen(3000, () => {
    console.log("Server running on port 3000")
})