import { Request, Response, NextFunction } from "express";
import userModal from "../models/user.model";
import mongoose from "mongoose";

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