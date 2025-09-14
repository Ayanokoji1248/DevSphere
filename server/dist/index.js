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
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv_1.default.config({ path: envFile });
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));
// Handle preflight OPTIONS requests
app.options(/.*/, (0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    console.log("Incoming Origin:", req.headers.origin);
    console.log("Allowed Origin:", process.env.FRONTEND_URL);
    next();
});
app.use("/api/auth", auth_route_1.default);
app.use('/api/user', user_route_1.default);
app.use('/api/post', post_route_1.default);
app.use('/api/project', project_route_1.default);
app.use('/api/comment', comment_route_1.default);
app.use('/api/ai', ai_route_1.default);
exports.default = app;
