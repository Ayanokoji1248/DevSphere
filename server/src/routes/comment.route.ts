import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createComment } from "../controllers/comment.controller";
const commentRouter = Router();


commentRouter.post('/create/:id', userMiddleware, createComment)


export default commentRouter