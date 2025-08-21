import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware"
import { getUser, getUserFollowing, getUserPost, getUserProfile, getUserProject, updateUserProfile, userFollowAndUnfollow } from "../controllers/user.controller"

const userRouter = Router()

userRouter.get('/me', userMiddleware, getUser)

userRouter.get("/following", userMiddleware, getUserFollowing)

userRouter.get("/:id/post", getUserPost)
userRouter.get('/:id/project', getUserProject)

userRouter.get('/:id', userMiddleware, getUserProfile)

userRouter.post('/:id/follow-unfollow', userMiddleware, userFollowAndUnfollow)

userRouter.put("/edit-profile", userMiddleware, updateUserProfile)



export default userRouter