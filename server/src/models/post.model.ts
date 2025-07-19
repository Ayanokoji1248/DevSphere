import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    content: {
        type: String,
        minlength: [10, "Content must be at least 10 characters"],
        maxlength: [5000, "Content cannot exceed 5000 characters"],
        required: true,
    },
    code: {
        type: String,
        min: [5, "Atleast 5 Character"],
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    link: {
        type: String,
        trim: true
    },
    tags: [String],

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0

    }
}, { timestamps: true });

const postModel = mongoose.model("post", postSchema)

export default postModel