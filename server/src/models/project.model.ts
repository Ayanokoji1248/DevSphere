import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    projectName: {
        type: String,
        minLength: 5,
        trim: true,
        required: true,
    },
    shortDesc: {
        type: String,
        minLength: 6,
        trim: true,
        required: true
    },
    longDesc: {
        type: String,
        minLenght: 10,
        trim: true,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Planning", "In Progress", "Completed"],
        default: "In Progress"
    },
    tech: {
        type: [String],
        default: [],
        required: true
    },
    githubLink: {
        type: String,
        trim: true
    },
    projectLink: {
        type: String,
        trim: true
    },
    projectImage: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true })

const projectModel = mongoose.model("project", projectSchema)

export default projectModel