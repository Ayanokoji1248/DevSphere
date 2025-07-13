import { Request, Response, NextFunction } from "express";
import userModal from "../models/user.model";
import mongoose from "mongoose";
import z from "zod";

const userSchema = z.object({
    fullName: z.string().min(5, "Atleast 5 character long").optional(),
    username: z.string().min(5, "Atleast 5 character long").max(20, "Username cannot exceed 20 characters").optional(),
    headline: z.string().min(5, "Atleast 5 Character").optional(),
    bio: z.string().min(10, "Atleast 10 Character").max(500, "Not more than 1000 characters").optional(),
    skills: z.array(z.string()).optional(),
    address: z.string().optional(),
    portfolioLink: z.string().url("Invalid URL").or(z.literal("")).optional(),
    profilePic: z.string().url().or(z.literal("")).optional(),
    bannerImage: z.string().url().or(z.literal("")).optional(),
})

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id

        const user = await userModal.findById(userId).select("-password")

        if (!user) {
            res.status(400).json({
                message: "Invalid User"
            })
            return
        }

        res.status(200).json({
            message: "User Found",
            user
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

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid User"
            })
            return
        }

        const user = await userModal.findById(id).select("-password")

        res.status(200).json({
            message: "User Found",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user.id;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid User"
            })
            return
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
        })

        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            })
            return
        }

        const user = await userModal.findByIdAndUpdate(userId, {
            fullName,
            username,
            headline,
            bio,
            skills,
            address,
            portfolioLink,
            bannerImage,
            profilePic
        }, { new: true }).select("-password")

        if (!user) {
            res.status(400).json({
                message: "User not found"
            })
            return
        }
        res.status(200).json({
            message: "User Profile Updated",
            updatedUser: user
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