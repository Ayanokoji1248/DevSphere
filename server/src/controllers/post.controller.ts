import { Request, Response, NextFunction } from "express"
import mongoose from "mongoose";
import postModel from "../models/post.model";
import z from "zod";
import userModal from "../models/user.model";

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