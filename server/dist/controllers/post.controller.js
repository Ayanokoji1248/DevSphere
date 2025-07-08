"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const post_model_1 = __importDefault(require("../models/post.model"));
const zod_1 = __importDefault(require("zod"));
const postValidationSchema = zod_1.default.object({
    content: zod_1.default.string().min(5, "Atleast 5 character long"),
    code: zod_1.default.string().optional(),
    image: zod_1.default.string().url().optional(),
    link: zod_1.default.string().url().optional(),
    tags: zod_1.default.array(zod_1.default.string())
});
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { content, code, image, link, tags } = req.body;
        const validate = postValidationSchema.safeParse(req.body);
        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            });
            return;
        }
        if (!userId || !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid User"
            });
            return;
        }
        const post = yield post_model_1.default.create({
            user: userId,
            content,
            code,
            image,
            link,
            tags
        });
        res.status(200).json({
            message: "Post Created",
            post
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.createPost = createPost;
