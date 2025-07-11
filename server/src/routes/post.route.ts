import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createPost, getAllPost, likeAndUnlikePost } from "../controllers/post.controller";
const postRouter = Router();

postRouter.post("/create", userMiddleware, createPost)

postRouter.get("/all", getAllPost);

postRouter.post('/like-unlike/:id', userMiddleware, likeAndUnlikePost)

export default postRouter
