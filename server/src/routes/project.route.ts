import { Router } from "express"
import { userMiddleware } from "../middlewares/user.middleware";
import { createProject, deleteProject, getAllProjects, getAllUserProject } from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.post('/create', userMiddleware, createProject)

projectRouter.get('/user-project', userMiddleware, getAllUserProject)

projectRouter.get("/all-project", getAllProjects)

projectRouter.delete("/:id", userMiddleware, deleteProject)

export default projectRouter;