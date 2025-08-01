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
exports.deletePost = exports.getParticularPost = exports.getAllUserPosts = exports.likeAndUnlikePost = exports.getAllPost = exports.createPost = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const post_model_1 = __importDefault(require("../models/post.model"));
const zod_1 = __importDefault(require("zod"));
const user_model_1 = __importDefault(require("../models/user.model"));
const like_model_1 = __importDefault(require("../models/like.model"));
const postValidationSchema = zod_1.default.object({
    content: zod_1.default.string().trim().min(5, "Atleast 5 character long"),
    code: zod_1.default.string().optional(),
    image: zod_1.default.string().url().optional(),
    link: zod_1.default.string().url().optional(),
    tags: zod_1.default.array(zod_1.default.string()).optional()
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
        const user = yield user_model_1.default.findById(userId).select("-password");
        const post = yield post_model_1.default.create({
            user: userId,
            content,
            code,
            image,
            link,
            tags
        });
        yield post.populate("user", "_id username fullName profilePic");
        user === null || user === void 0 ? void 0 : user.posts.push(post._id);
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).json({
            message: "Post Created",
            post,
            updatedUser: user,
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
const getAllPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find({}).populate("user", "_id username fullName profilePic");
        res.status(200).json({
            message: "All posts",
            posts
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
exports.getAllPost = getAllPost;
const likeAndUnlikePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const postId = req.params.id;
        if (!postId || !mongoose_1.default.Types.ObjectId.isValid(postId)) {
            res.status(400).json({
                message: "Invalid Post Id"
            });
            return;
        }
        const postData = yield post_model_1.default.findById(postId);
        if (!postData) {
            res.status(404).json({
                message: "Post not found"
            });
            return;
        }
        const alreadyLike = yield like_model_1.default.findOne({
            user: userId,
            post: postId
        });
        if (alreadyLike) {
            const updatedPost = yield post_model_1.default.findByIdAndUpdate(postId, {
                $pull: { likes: alreadyLike._id },
                $inc: { likeCount: -1 }
            }, { new: true });
            yield like_model_1.default.findByIdAndDelete(alreadyLike._id);
            res.status(200).json({
                message: "Post Unliked",
                likeCount: updatedPost === null || updatedPost === void 0 ? void 0 : updatedPost.likeCount
            });
            return;
        }
        const likePost = yield like_model_1.default.create({
            user: userId,
            post: postId
        });
        // postData.likes.push(likePost._id)
        // postData.likeCount += 1;
        // await postData.save()
        const updatedPost = yield post_model_1.default.findByIdAndUpdate(postId, {
            $push: { likes: likePost._id },
            $inc: { likeCount: 1 }
        }, { new: true });
        res.status(200).json({
            message: "Post Liked",
            likeCount: updatedPost === null || updatedPost === void 0 ? void 0 : updatedPost.likeCount
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
exports.likeAndUnlikePost = likeAndUnlikePost;
const getAllUserPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        if (!userId || !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid User"
            });
            return;
        }
        const posts = yield post_model_1.default.find({ user: userId }).populate("user", "_id username fullName profilePic");
        res.status(200).json({
            message: "User Posts",
            posts
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
exports.getAllUserPosts = getAllUserPosts;
const getParticularPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Post Id"
            });
            return;
        }
        const post = yield post_model_1.default.findById(id).populate("user", "_id username fullName profilePic");
        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            });
            return;
        }
        res.status(200).json({
            message: "Post Found",
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
exports.getParticularPost = getParticularPost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const user = yield user_model_1.default.findByIdAndUpdate(userId, {
            $pull: { posts: id }
        }, { new: true });
        const post = yield post_model_1.default.findById(id);
        if (!post) {
            res.status(404).json({
                message: "Post not found"
            });
            return;
        }
        if ((post === null || post === void 0 ? void 0 : post.user._id.toString()) !== userId.toString()) {
            res.status(400).json({
                message: "You are not allowed to delete this post"
            });
            return;
        }
        yield post_model_1.default.findByIdAndDelete(id, { new: true });
        res.status(200).json({
            message: "Post deleted",
            updatedUser: user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.deletePost = deletePost;
