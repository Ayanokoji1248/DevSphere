import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createPost, getAllPost } from "../controllers/post.controller";
const postRouter = Router();

postRouter.post("/create", userMiddleware, createPost)

postRouter.get("/all", getAllPost);

export default postRouter
