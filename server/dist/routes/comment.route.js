"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = require("../middlewares/user.middleware");
const comment_controller_1 = require("../controllers/comment.controller");
const commentRouter = (0, express_1.Router)();
commentRouter.post('/create/:id', user_middleware_1.userMiddleware, comment_controller_1.createComment);
commentRouter.get('/all/:id', comment_controller_1.getAllComments);
exports.default = commentRouter;
