"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.getParticularProject = exports.getAllProjects = exports.getAllUserProject = exports.createProject = void 0;
const zod_1 = __importDefault(require("zod"));
const project_model_1 = __importDefault(require("../models/project.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const projectValidateSchema = zod_1.default.object({
    projectName: zod_1.default.string().min(5, "At least 5 character").trim(),
    shortDesc: zod_1.default.string().min(6, "Atleast 6 character").trim(),
    longDesc: zod_1.default.string().min(10, "At least 10 character").trim(),
    category: zod_1.default.string(),
    status: zod_1.default.enum(["Planning", "In Progress", "Completed"]),
    tech: zod_1.default.array(zod_1.default.string()),
    githubLink: zod_1.default.string().optional(),
    projectLink: zod_1.default.string().optional(),
    projectImage: zod_1.default.string().url("Invalid Url").trim().nullable().optional()
});
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { projectName, shortDesc, longDesc, category, status, tech, githubLink, projectLink, projectImage } = req.body;
        const validate = projectValidateSchema.safeParse(req.body);
        if (!validate.success) {
            res.status(400).json({
                message: "Validation Error",
                error: validate.error.flatten().fieldErrors
            });
            return;
        }
        const project = yield project_model_1.default.create({
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
        });
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, {
            $push: { projects: project._id }
        }, { new: true }).select("-password");
        const projectData = yield project_model_1.default.findById(project._id).populate("user", "_id username fullName profilePic");
        res.status(200).json({
            message: "Project Created",
            project: projectData,
            updatedUser,
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.createProject = createProject;
const getAllUserProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const projects = yield project_model_1.default.find({ user: userId }).populate("user", "_id username fullName profilePic");
        if (projects.length === 0) {
            res.status(400).json({
                message: "No Projects there"
            });
            return;
        }
        res.status(200).json({
            message: "User Projects",
            projects
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.getAllUserProject = getAllUserProject;
const getAllProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield project_model_1.default.find({}).populate("user", "_id username fullName profilePic");
        res.status(200).json({
            projects
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.getAllProjects = getAllProjects;
const getParticularProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Id"
            });
            return;
        }
        const project = yield project_model_1.default.findById(id).populate("user", "_id username fullName profilePic");
        if (!project) {
            res.status(404).json({
                message: "Project Not Found",
            });
            return;
        }
        res.status(200).json({
            message: "Project Found",
            project
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.getParticularProject = getParticularProject;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;
        if (!projectId || !mongoose_1.default.Types.ObjectId.isValid(projectId)) {
            res.status(400).json({
                message: "Invalid Project Id"
            });
            return;
        }
        const project = yield project_model_1.default.findById(projectId);
        if (!project) {
            res.status(404).json({
                message: "Project Not Found"
            });
            return;
        }
        if (project.user.toString() !== userId) {
            res.status(403).json({
                message: "Forbidden"
            });
            return;
        }
        const user = yield user_model_1.default.findByIdAndUpdate(userId, {
            $pull: { projects: new mongoose_1.default.Types.ObjectId(projectId) }
        }, { new: true }).select("-password");
        yield project.deleteOne();
        res.status(200).json({
            message: "Project Deleted Successfully",
            user
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.deleteProject = deleteProject;
