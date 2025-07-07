import { Request, Response, NextFunction } from "express"
import userModal from "../models/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const userRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, fullName } = req.body

        const userExist = await userModal.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        })

        if (userExist) {
            res.status(400).json({
                message: "Email or Username Already taken"
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModal.create({
            fullName,
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET as string)

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict"
        })

        const { password: _, ...userData } = user.toObject()

        res.status(201).json({
            message: "User Created",
            user: userData
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}