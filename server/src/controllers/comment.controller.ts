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
            res.status(401).json({ message: "Authentication required" });
            return
        }

        const { comment } = req.body;
        const postId = req.params.id;
        const userId = req.user.id;

        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            res.status(400).json({
                message: "Invalid Post Id"
            });
            return
        }

        const validate = commentZodSchema.safeParse(req.body);

        if (!validate.success) {
            res.status(400).json({
                message: "validation errors",
                error: validate.error.flatten().fieldErrors
            });
            return
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
            res.status(404).json({
                message: "Post not found"
            });
            return
        }

        res.status(201).json({
            message: "Comment Created",
            comment: populatedComment,
            commentCount: post.commentCount,
            post
        });
        return

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
};

export const getAllComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = req.params.id;

        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            res.status(400).json({
                message: "Invalid Post ID"
            });
            return
        }

        const comments = await commentModel.find({
            post: postId
        }).populate("user", "_id username fullName profilePic").sort({ createdAt: -1 });

        // This check is fine, but it's often better to return an empty array
        // than a 400 error. The client can then decide how to display "No Comments".
        if (comments.length === 0) {
            res.status(200).json({
                message: "No Comments Found",
                comments: []
            });
            return
        }

        res.status(200).json({
            message: "All Comments",
            comments
        });
        return

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return
    }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // --- FIX: Proactively check if req.user exists ---
        if (!req.user) {
            res.status(401).json({ message: "Authentication required" });
            return
        }

        const commentId = req.params.id;
        const userId = req.user.id;

        if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
            res.status(400).json({
                message: "Invalid Comment Id"
            });
            return
        }

        const comment = await commentModel.findById(commentId);

        if (!comment) {
            res.status(404).json({
                message: "Comment Not Found"
            });
            return
        }

        // --- CONFIRMATION: This is the correct way to handle the 'comment.user' error ---
        // The optional chaining (?.) prevents a crash if comment.user is null.
        if (comment.user?.toString() !== userId.toString()) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return
        }

        const postId = comment.post;

        if (!postId) {
            res.status(404).json({
                message: "Invalid Post Id, comment is not associated with a post"
            });
            return
        }

        const post = await postModel.findById(postId);

        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            });
            return
        }

        const updatedPost = await postModel.findByIdAndUpdate(postId, {
            $inc: { commentCount: -1 }
        }, { new: true });

        // --- FIX: Check if the post was actually found and updated ---
        // This solves the "'updatedPost' is possibly 'null'" error.
        if (!updatedPost) {
            res.status(404).json({
                message: "Post not found while updating comment count"
            });
            return
        }

        await commentModel.findByIdAndDelete(commentId);

        res.status(200).json({
            message: "Comment Deleted Successfully",
            updatedCount: updatedPost.commentCount
        });
        return

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return
    }
};