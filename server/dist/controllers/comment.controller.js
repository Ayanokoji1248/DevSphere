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
exports.getAllComments = exports.createComment = void 0;
const zod_1 = __importDefault(require("zod"));
const comment_model_1 = __importDefault(require("../models/comment.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_model_1 = __importDefault(require("../models/post.model"));
const commentZodSchema = zod_1.default.object({
    comment: zod_1.default.string().min(1, "Required").max(100, "Atmost 100 character")
});
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment } = req.body;
        const postId = req.params.id;
        const userId = req.user.id;
        if (!postId || !mongoose_1.default.Types.ObjectId.isValid(postId)) {
            res.status(400).json({
                message: "Invalid Post Id"
            });
            return;
        }
        const validate = commentZodSchema.safeParse(req.body);
        if (!validate.success) {
            res.status(400).json({
                message: "validation errors",
                error: validate.error.flatten().fieldErrors
            });
            return;
        }
        const commentData = yield comment_model_1.default.create({
            comment,
            post: postId,
            user: userId,
        });
        const populatedComment = yield comment_model_1.default.findById(commentData._id).populate("user", "_id username fullName profilePic");
        const post = yield post_model_1.default.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } }, { new: true } // return updated document
        ).populate("user", "_id username fullName profilePic");
        if (!post) {
            res.status(404).json({
                message: "Post not found"
            });
            return;
        }
        res.status(201).json({
            message: "Comment Created",
            comment: populatedComment,
            commentCount: post.commentCount,
            post
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.createComment = createComment;
const getAllComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        // const userId = req.user.id
        if (!postId || !mongoose_1.default.Types.ObjectId.isValid(postId)) {
            res.status(400).json({
                message: "Invalid Post ID"
            });
            return;
        }
        const comments = yield comment_model_1.default.find({
            post: postId
        }).populate("user", "_id username fullName profilePic").sort({ createdAt: -1 });
        if (comments.length === 0) {
            res.status(400).json({
                message: "No Comments Found"
            });
            return;
        }
        res.status(200).json({
            message: "All Comments",
            comments
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.getAllComments = getAllComments;
