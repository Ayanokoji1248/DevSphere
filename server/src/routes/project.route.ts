import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createProject, getAllProjects, getAllUserProject } from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.post('/create', userMiddleware, createProject)

projectRouter.get('/user-project', userMiddleware, getAllUserProject)

projectRouter.get("/all-project", getAllProjects)

export default projectRouter;