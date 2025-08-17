import { Request, Response, NextFunction } from "express";
import z from "zod";
import projectModel from "../models/project.model";
import userModal from "../models/user.model";
import mongoose from "mongoose";

const projectValidateSchema = z.object({
    projectName: z.string().min(5, "At least 5 character").trim(),
    shortDesc: z.string().min(6, "Atleast 6 character").trim(),
    longDesc: z.string().min(10, "At least 10 character").trim(),
    category: z.string(),
    status: z.enum(["Planning", "In Progress", "Completed"]),
    tech: z.array(z.string()),
    githubLink: z.string().optional(),
    projectLink: z.string().optional(),
    projectImage: z.string().url("Invalid Url").trim().nullable().optional()
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

export const getAllUserProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const projects = await projectModel.find({ user: userId }).populate("user", "_id username fullName profilePic");

        if (projects.length === 0) {
            res.status(400).json({
                message: "No Projects there"
            })
            return
        }

        res.status(200).json({
            message: "User Projects",
            projects
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


export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await projectModel.find({}).populate("user", "_id username fullName profilePic")

        res.status(200).json({
            projects
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getParticularProject = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Id"
            })
            return;
        }

        const project = await projectModel.findById(id).populate("user", "_id username fullName profilePic");

        if (!project) {
            res.status(404).json({
                message: "Project Not Found",
            })
            return
        }

        res.status(200).json({
            message: "Project Found",
            project
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

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;

        if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
            res.status(400).json({
                message: "Invalid Project Id"
            })
            return
        }



        const project = await projectModel.findById(projectId)

        if (!project) {
            res.status(404).json({
                message: "Project Not Found"
            })
            return
        }

        if (project.user.toString() !== userId) {
            res.status(403).json({
                message: "Forbidden"
            })
            return
        }

        const user = await userModal.findByIdAndUpdate(userId, {
            $pull: { projects: new mongoose.Types.ObjectId(projectId) }
        }, { new: true }).select("-password")

        await project.deleteOne()

        res.status(200).json({
            message: "Project Deleted Successfully",
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