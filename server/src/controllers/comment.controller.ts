import { Request, Response, NextFunction } from "express"
import z from "zod"
import commentModel from "../models/comment.model"
import mongoose from "mongoose"
import postModel from "../models/post.model"

const commentZodSchema = z.object({
    comment: z.string().min(1, "Required").max(100, "Atmost 100 character")
})

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { comment } = req.body
        const postId = req.params.id
        const userId = req.user.id

        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            res.status(400).json({
                message: "Invalid Post Id"
            })
            return
        }

        const validate = commentZodSchema.safeParse(req.body);

        if (!validate.success) {
            res.status(400).json({
                message: "validation errors",
                error: validate.error.flatten().fieldErrors
            })
            return
        }

        const commentData = await commentModel.create({
            comment,
            post: postId,
            user: userId,
        })

        const populatedComment = await commentModel.findById(commentData._id).populate("user", "_id username fullName profilePic")

        const post = await postModel.findByIdAndUpdate(
            postId,
            { $inc: { commentCount: 1 } },
            { new: true } // return updated document
        )

        if (!post) {
            res.status(404).json({
                message: "Post not found"
            })
            return
        }

        res.status(201).json({
            message: "Comment Created",
            comment: populatedComment,
            commentCount: post.commentCount
        })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}