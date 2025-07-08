"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = require("../middlewares/user.middleware");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get('/me', user_middleware_1.userMiddleware, user_controller_1.getUser);
userRouter.get('/:id', user_controller_1.getUserProfile);
exports.default = userRouter;
