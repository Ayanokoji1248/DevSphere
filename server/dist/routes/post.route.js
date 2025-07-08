"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = require("../middlewares/user.middleware");
const post_controller_1 = require("../controllers/post.controller");
const postRouter = (0, express_1.Router)();
postRouter.post("/create", user_middleware_1.userMiddleware, post_controller_1.createPost);
exports.default = postRouter;
