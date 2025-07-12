import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createProject } from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.post('/create', userMiddleware, createProject)

export default projectRouter;