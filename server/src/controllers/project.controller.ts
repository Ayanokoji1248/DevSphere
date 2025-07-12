import { Request, Response, NextFunction } from "express";
import z from "zod";
import projectModel from "../models/project.model";
import userModal from "../models/user.model";

const projectValidateSchema = z.object({
    projectName: z.string().min(5, "At least 5 character").trim(),
    shortDesc: z.string().min(6, "Atleast 6 character").trim(),
    longDesc: z.string().min(10, "At least 10 character").trim(),
    category: z.string(),
    status: z.enum(["Planning", "In Progress", "Completed"]),
    tech: z.array(z.string()),
    githubLink: z.string().optional(),
    projectLink: z.string().optional(),
    projectImage: z.string().url("Invalid Url").trim().optional()
})

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;

        const { projectName, shortDesc, longDesc, category, status, tech, githubLink, projectLink, projectImage } = req.body

        const validate = projectValidateSchema.safeParse(req.body);

        if (!validate.success) {
            res.status(400).json({
                message: "Validation Error",
                error: validate.error.flatten().fieldErrors
            })
            return
        }
        const project = await projectModel.create({
            projectName,
            shortDesc,
            longDesc,
            category,
            status,
            tech,
            githubLink,
            projectLink,
            projectImage,
            user: userId
        })

        const updatedUser = await userModal.findByIdAndUpdate(userId, {
            $push: { projects: project._id }
        }, { new: true }).select("-password")
        const projectData = await projectModel.findById(project._id).populate("user", "_id username fullName profilePic");

        res.status(200).json({
            message: "Project Created",
            project: projectData,
            updatedUser,
        })
        return


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}