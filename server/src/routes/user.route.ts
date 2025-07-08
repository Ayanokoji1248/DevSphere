import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware"
import { getUser, getUserProfile } from "../controllers/user.controller"

const userRouter = Router()

userRouter.get('/me', userMiddleware, getUser)

userRouter.get('/:id', getUserProfile)



export default userRouter