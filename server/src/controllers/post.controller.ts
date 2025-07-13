import { Request, Response, NextFunction, response } from "express"
import mongoose from "mongoose";
import postModel from "../models/post.model";
import z from "zod";
import userModal from "../models/user.model";
import likeModel from "../models/like.model";

const postValidationSchema = z.object({
    content: z.string().trim().min(5, "Atleast 5 character long"),
    code: z.string().optional(),
    image: z.string().url().optional(),
    link: z.string().url().optional(),
    tags: z.array(z.string()).optional()
})

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user.id;

        const { content, code, image, link, tags } = req.body

        const validate = postValidationSchema.safeParse(req.body);

        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            })
            return
        }

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid User"
            })
            return
        }

        const user = await userModal.findById(userId).select("-password")

        const post = await postModel.create({
            user: userId,
            content,
            code,
            image,
            link,
            tags
        })
        await post.populate("user", "_id username fullName profilePic");

        user?.posts.push(post._id)
        await user?.save()
        res.status(200).json({
            message: "Post Created",
            post,
            updatedUser: user,
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await postModel.find({}).populate("user", "_id username fullName profilePic");

        res.status(200).json({
            message: "All posts",
            posts
        })
        return

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const likeAndUnlikePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;

        const postId = req.params.id;

        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            res.status(400).json({
                message: "Invalid Post Id"
            })
            return
        }

        const postData = await postModel.findById(postId);

        if (!postData) {
            res.status(404).json({
                message: "Post not found"
            })
            return
        }

        const alreadyLike = await likeModel.findOne({
            user: userId,
            post: postId
        })

        if (alreadyLike) {
            const updatedPost = await postModel.findByIdAndUpdate(postId, {
                $pull: { likes: alreadyLike._id },
                $inc: { likeCount: -1 }
            }, { new: true })
            await likeModel.findByIdAndDelete(alreadyLike._id);
            res.status(200).json({
                message: "Post Unliked",
                likeCount: updatedPost?.likeCount
            })
            return
        }

        const likePost = await likeModel.create({
            user: userId,
            post: postId
        })
        // postData.likes.push(likePost._id)
        // postData.likeCount += 1;
        // await postData.save()
        const updatedPost = await postModel.findByIdAndUpdate(postId, {
            $push: { likes: likePost._id },
            $inc: { likeCount: 1 }
        }, { new: true })

        res.status(200).json({
            message: "Post Liked",
            likeCount: updatedPost?.likeCount
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

export const getAllUserPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid User"
            })
            return
        }

        const posts = await postModel.find({ user: userId }).populate("user", "_id username fullName profilePic");

        res.status(200).json({
            message: "User Posts",
            posts
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

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user.id;

        const { id } = req.params;
        const user = await userModal.findByIdAndUpdate(userId, {
            $pull: { posts: id }
        }, { new: true })
        const post = await postModel.findById(id);

        if (!post) {
            res.status(404).json({
                message: "Post not found"
            })
            return
        }
        if (post?.user._id.toString() !== userId.toString()) {
            res.status(400).json({
                message: "You are not allowed to delete this post"
            })
            return
        }
        await postModel.findByIdAndDelete(id, { new: true })

        res.status(200).json({
            message: "Post deleted",
            updatedUser: user,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}