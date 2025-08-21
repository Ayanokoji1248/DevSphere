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
exports.getUserFollowing = exports.userFollowAndUnfollow = exports.getUserProject = exports.getUserPost = exports.updateUserProfile = exports.getUserProfile = exports.getUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
const post_model_1 = __importDefault(require("../models/post.model"));
const project_model_1 = __importDefault(require("../models/project.model"));
const follow_model_1 = __importDefault(require("../models/follow.model"));
const userSchema = zod_1.default.object({
    fullName: zod_1.default.string().min(5, "Atleast 5 character long").optional(),
    username: zod_1.default.string().min(5, "Atleast 5 character long").max(20, "Username cannot exceed 20 characters").optional(),
    headline: zod_1.default.string().min(5, "Atleast 5 Character").optional(),
    bio: zod_1.default.string().min(10, "Atleast 10 Character").max(500, "Not more than 1000 characters").optional(),
    skills: zod_1.default.array(zod_1.default.string()).optional(),
    address: zod_1.default.string().optional(),
    portfolioLink: zod_1.default.string().url("Invalid URL").or(zod_1.default.literal("")).optional(),
    profilePic: zod_1.default.string().url().or(zod_1.default.literal("")).optional(),
    bannerImage: zod_1.default.string().url().or(zod_1.default.literal("")).optional(),
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const user = yield user_model_1.default.findById(userId).select("-password");
        if (!user) {
            res.status(400).json({
                message: "Invalid User"
            });
            return;
        }
        res.status(200).json({
            message: "User Found",
            user
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
exports.getUser = getUser;
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // console.log(id)
        const currentUserId = req.user.id;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid User" });
            return;
        }
        const user = yield user_model_1.default.findById(id).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Check follow status
        const isFollowing = yield follow_model_1.default.exists({
            follower: currentUserId,
            following: id
        });
        res.status(200).json({
            message: "User Found",
            user,
            isFollowing: !!isFollowing,
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        if (!userId || !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid User"
            });
            return;
        }
        const { fullName, username, headline, bio, skills, address, portfolioLink, profilePic, bannerImage } = req.body;
        const validate = userSchema.safeParse({
            fullName,
            username,
            headline,
            bio,
            skills,
            address,
            portfolioLink,
            profilePic,
            bannerImage,
        });
        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            });
            return;
        }
        const user = yield user_model_1.default.findByIdAndUpdate(userId, {
            fullName,
            username,
            headline,
            bio,
            skills,
            address,
            portfolioLink,
            bannerImage,
            profilePic
        }, { new: true }).select("-password");
        if (!user) {
            res.status(400).json({
                message: "User not found"
            });
            return;
        }
        res.status(200).json({
            message: "User Profile Updated",
            updatedUser: user
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
exports.updateUserProfile = updateUserProfile;
const getUserPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Id"
            });
            return;
        }
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
        const posts = yield post_model_1.default.find({
            user: id
        }).sort({ createdAt: -1 }).populate("user", "_id username fullName profilePic");
        res.status(200).json({
            message: "User Post Founded",
            posts
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.getUserPost = getUserPost;
const getUserProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Id"
            });
            return;
        }
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
        const projects = yield project_model_1.default.find({
            user: id
        }).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Project Founded",
            projects
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
exports.getUserProject = getUserProject;
const userFollowAndUnfollow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followUserId = req.params.id;
        const currentUserId = req.user.id;
        if (!followUserId || !mongoose_1.default.Types.ObjectId.isValid(followUserId)) {
            res.status(400).json({ message: "Invalid Id" });
            return;
        }
        if (followUserId === currentUserId) {
            res.status(400).json({ message: "You cannot follow yourself" });
            return;
        }
        const alreadyFollow = yield follow_model_1.default.findOne({
            following: followUserId,
            follower: currentUserId
        });
        if (alreadyFollow) {
            yield follow_model_1.default.findByIdAndDelete(alreadyFollow._id);
            // Decrease counts
            yield user_model_1.default.findByIdAndUpdate(currentUserId, { $inc: { followingCount: -1 } });
            yield user_model_1.default.findByIdAndUpdate(followUserId, { $inc: { followerCount: -1 } });
            const user = yield user_model_1.default.findById(currentUserId).select("-password");
            res.status(200).json({
                message: "User Unfollowed",
                updatedUser: user
            });
            return;
        }
        yield follow_model_1.default.create({
            following: followUserId,
            follower: currentUserId,
        });
        // Increase counts
        yield user_model_1.default.findByIdAndUpdate(currentUserId, { $inc: { followingCount: 1 } });
        yield user_model_1.default.findByIdAndUpdate(followUserId, { $inc: { followerCount: 1 } });
        const user = yield user_model_1.default.findById(currentUserId).select("-password");
        const followedUser = yield user_model_1.default.findById(followUserId).select("_id fullName username profilePic");
        res.status(200).json({
            message: "User Followed",
            updatedUser: user,
            followedUser
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.userFollowAndUnfollow = userFollowAndUnfollow;
const getUserFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const userFollowing = yield follow_model_1.default.find({
            follower: userId
        }).populate('following', "_id profilePic username fullName").select("following");
        const followingList = userFollowing.map(f => f.following);
        res.status(200).json({
            message: "user following list",
            userFollowing: followingList,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        });
    }
});
exports.getUserFollowing = getUserFollowing;
