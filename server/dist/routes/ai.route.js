"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = require("../middlewares/user.middleware");
const ai_controller_1 = require("../controllers/ai.controller");
const aiRouter = (0, express_1.Router)();
aiRouter.post('/code-review', user_middleware_1.userMiddleware, ai_controller_1.reviewCode);
exports.default = aiRouter;
