import { Request, Response, NextFunction } from "express";
import z from "zod";
import commentModel from "../models/comment.model";
import mongoose from "mongoose";
import postModel from "../models/post.model";
// Removed unused import: import { idText } from "typescript"

const commentZodSchema = z.object({
    comment: z.string().min(1, "Required").max(100, "Atmost 100 character")
});

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // --- FIX: Proactively check if req.user exists ---
        // This prevents errors if the user is not authenticated.
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const { comment } = req.body;
        const postId = req.params.id;
        const userId = req.user.id;

        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid Post Id"
            });
        }

        const validate = commentZodSchema.safeParse(req.body);

        if (!validate.success) {
            return res.status(400).json({
                message: "validation errors",
                error: validate.error.flatten().fieldErrors
            });
        }

        const commentData = await commentModel.create({
            comment,
            post: postId,
            user: userId,
        });

        const populatedComment = await commentModel.findById(commentData._id).populate("user", "_id username fullName profilePic");

        const post = await postModel.findByIdAndUpdate(
            postId,
            { $inc: { commentCount: 1 } },
            { new: true } // return updated document
        ).populate("user", "_id username fullName profilePic");

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(201).json({
            message: "Comment Created",
            comment: populatedComment,
            commentCount: post.commentCount,
            post
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const getAllComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = req.params.id;

        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({
                message: "Invalid Post ID"
            });
        }

        const comments = await commentModel.find({
            post: postId
        }).populate("user", "_id username fullName profilePic").sort({ createdAt: -1 });

        // This check is fine, but it's often better to return an empty array
        // than a 400 error. The client can then decide how to display "No Comments".
        if (comments.length === 0) {
            return res.status(200).json({
                message: "No Comments Found",
                comments: []
            });
        }

        res.status(200).json({
            message: "All Comments",
            comments
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // --- FIX: Proactively check if req.user exists ---
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const commentId = req.params.id;
        const userId = req.user.id;

        if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                message: "Invalid Comment Id"
            });
        }

        const comment = await commentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment Not Found"
            });
        }

        // --- CONFIRMATION: This is the correct way to handle the 'comment.user' error ---
        // The optional chaining (?.) prevents a crash if comment.user is null.
        if (comment.user?.toString() !== userId.toString()) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const postId = comment.post;

        if (!postId) {
            return res.status(404).json({
                message: "Invalid Post Id, comment is not associated with a post"
            });
        }

        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post Not Found"
            });
        }

        const updatedPost = await postModel.findByIdAndUpdate(postId, {
            $inc: { commentCount: -1 }
        }, { new: true });

        // --- FIX: Check if the post was actually found and updated ---
        // This solves the "'updatedPost' is possibly 'null'" error.
        if (!updatedPost) {
            return res.status(404).json({
                message: "Post not found while updating comment count"
            });
        }

        await commentModel.findByIdAndDelete(commentId);

        return res.status(200).json({
            message: "Comment Deleted Successfully",
            updatedCount: updatedPost.commentCount
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};