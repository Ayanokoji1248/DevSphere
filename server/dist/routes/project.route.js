"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = require("../middlewares/user.middleware");
const project_controller_1 = require("../controllers/project.controller");
const projectRouter = (0, express_1.Router)();
projectRouter.post('/create', user_middleware_1.userMiddleware, project_controller_1.createProject);
exports.default = projectRouter;
