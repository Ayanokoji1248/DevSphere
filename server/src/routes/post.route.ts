import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createPost, deletePost, getAllPost, getAllUserPosts, likeAndUnlikePost } from "../controllers/post.controller";
const postRouter = Router();

postRouter.post("/create", userMiddleware, createPost)

postRouter.get("/all", getAllPost);

postRouter.get('/user-posts', userMiddleware, getAllUserPosts)

postRouter.post('/like-unlike/:id', userMiddleware, likeAndUnlikePost)

postRouter.delete('/:id', userMiddleware, deletePost)
export default postRouter
