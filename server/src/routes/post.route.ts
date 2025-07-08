import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createPost } from "../controllers/post.controller";
const postRouter = Router();

postRouter.post("/create", userMiddleware, createPost)


export default postRouter
