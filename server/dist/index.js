"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const cors_1 = __importDefault(require("cors"));
const project_route_1 = __importDefault(require("./routes/project.route"));
const comment_route_1 = __importDefault(require("./routes/comment.route"));
const ai_route_1 = __importDefault(require("./routes/ai.route"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// you should add origin here and other config too
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true, // this is most important because we are using cookie based authentication
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_route_1.default);
app.use('/api/user/', user_route_1.default);
app.use('/api/post/', post_route_1.default);
app.use('/api/project', project_route_1.default);
app.use('/api/comment', comment_route_1.default);
app.use('/api/ai/', ai_route_1.default);
exports.default = app;
