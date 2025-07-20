import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createComment, getAllComments } from "../controllers/comment.controller";
const commentRouter = Router();


commentRouter.post('/create/:id', userMiddleware, createComment)

commentRouter.get('/all/:id', getAllComments)


export default commentRouter