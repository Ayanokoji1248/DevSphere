import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware"
import { getUser, getUserProfile, updateUserProfile } from "../controllers/user.controller"

const userRouter = Router()

userRouter.get('/me', userMiddleware, getUser)

userRouter.get('/:id', getUserProfile)

userRouter.put("/edit-profile", userMiddleware, updateUserProfile)



export default userRouter