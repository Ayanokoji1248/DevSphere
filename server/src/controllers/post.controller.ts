import { Request, Response, NextFunction } from "express"
import mongoose from "mongoose";
import postModel from "../models/post.model";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user.id;

        const { content, code, image, link, tags } = req.body

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid User"
            })
            return
        }

        const post = await postModel.create({
            user: userId,
            content,
            code,
            image,
            link,
            tags
        })

        res.status(200).json({
            message: "Post Created",
            post
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}