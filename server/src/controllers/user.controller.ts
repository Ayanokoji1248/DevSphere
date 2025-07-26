import { Request, Response, NextFunction } from "express";
import userModal from "../models/user.model";
import mongoose, { mongo } from "mongoose";
import z from "zod";
import postModel from "../models/post.model";
import _ from "passport-local-mongoose";
import projectModel from "../models/project.model";
import followModel from "../models/follow.model";

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
        const { id } = req.params;
        // console.log(id)
        const currentUserId = req.user.id;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid User" });
            return
        }

        const user = await userModal.findById(id).select("-password");

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return
        }

        // Check follow status
        const isFollowing = await followModel.exists({
            follower: currentUserId,
            following: id
        });

        res.status(200).json({
            message: "User Found",
            user,
            isFollowing: !!isFollowing,
        });
        return

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return
    }
};


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

export const getUserPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Id"
            })
            return
        }

        const user = await userModal.findById(id)

        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
            return
        }

        const posts = await postModel.find({
            user: id
        }).sort({ createdAt: -1 }).populate("user", "_id username fullName profilePic")

        res.status(200).json({
            message: "User Post Founded",
            posts
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getUserProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Id"
            })
            return
        }

        const user = await userModal.findById(id);

        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
            return
        }

        const projects = await projectModel.find({
            user: id
        }).sort({ createdAt: -1 })

        res.status(200).json({
            message: "Project Founded",
            projects
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const userFollowAndUnfollow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followUserId = req.params.id;
        const currentUserId = req.user.id;

        if (!followUserId || !mongoose.Types.ObjectId.isValid(followUserId)) {
            res.status(400).json({ message: "Invalid Id" });
            return;
        }

        if (followUserId === currentUserId) {
            res.status(400).json({ message: "You cannot follow yourself" });
            return
        }

        const alreadyFollow = await followModel.findOne({
            following: followUserId,
            follower: currentUserId
        });

        if (alreadyFollow) {
            await followModel.findByIdAndDelete(alreadyFollow._id);

            // Decrease counts
            await userModal.findByIdAndUpdate(currentUserId, { $inc: { followingCount: -1 } });
            await userModal.findByIdAndUpdate(followUserId, { $inc: { followerCount: -1 } });

            res.status(200).json({ message: "User Unfollowed" });
            return
        }

        await followModel.create({
            following: followUserId,
            follower: currentUserId,
        });

        // Increase counts
        await userModal.findByIdAndUpdate(currentUserId, { $inc: { followingCount: 1 } });
        await userModal.findByIdAndUpdate(followUserId, { $inc: { followerCount: 1 } });

        res.status(200).json({ message: "User Followed" });
        return

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return
    }
};
