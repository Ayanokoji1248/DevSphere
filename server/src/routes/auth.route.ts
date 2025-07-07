import { Router } from "express"
import { logout, userLogin, userRegister } from "../controllers/auth.controller";
const authRouter = Router();

authRouter.post('/register', userRegister)
authRouter.post("/login", userLogin)
authRouter.post('/logout', logout)

export default authRouter