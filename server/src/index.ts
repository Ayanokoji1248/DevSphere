import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import { dbConnect } from "./config/dbConnection";
const app = express()

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use("/api/auth", authRouter)

async function main() {

    await dbConnect();
    app.listen(3000, () => {
        console.log("Server running on port 3000")
    })
}

main()