import { Request, Response, NextFunction } from "express"
import userModal from "../models/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import z from "zod";

const registerSchema = z.object({
    fullName: z.string().min(5, "Atleast 5 character long"),
    email: z.string().email("Invalid Email format"),
    username: z.string().min(5, "Atleast 5 character long"),
    password: z.string().min(5, "Atleast 5 character long"),
})

const loginSchema = registerSchema.pick({
    email: true,
    password: true
})

export const userRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, fullName } = req.body

        const validate = registerSchema.safeParse(req.body);

        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            })
            return
        }

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
            sameSite: "none",
            secure: true
        })

        const { password: _, ...userData } = user.toObject()

        res.status(201).json({
            message: "User Created",
            user: userData,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { email, password } = req.body;

        const validate = loginSchema.safeParse(req.body)

        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            })
            return
        }

        const user = await userModal.findOne({ email })

        if (!user) {
            res.status(400).json({
                message: "Invalid Credentials"
            })
            return
        }

        const passValid = await bcrypt.compare(password, user.password);

        if (!passValid) {
            res.status(400).json({
                message: "Invalid Credentials"
            })
            return
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET as string)

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        })

        const { password: _, ...userData } = user.toObject()

        res.status(200).json({
            user: userData,
            token
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

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                message: "Unauthorized"
            })
            return
        }

        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict"
        })

        res.status(200).json({
            message: "Logged Out successfully"
        })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}