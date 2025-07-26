import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware"
import { getUser, getUserPost, getUserProfile, getUserProject, updateUserProfile, userFollowAndUnfollow } from "../controllers/user.controller"

const userRouter = Router()

userRouter.get('/me', userMiddleware, getUser)

userRouter.get('/:id', getUserProfile)

userRouter.put("/edit-profile", userMiddleware, updateUserProfile)

userRouter.get("/:id/post", getUserPost)

userRouter.get('/:id/project', getUserProject)

userRouter.post('/:id/follow-unfollow', userMiddleware, userFollowAndUnfollow)

export default userRouter