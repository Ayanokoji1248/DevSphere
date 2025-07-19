import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        minLength: [1, "Cannot be empty"]
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true,
    },
}, {
    timestamps: true,
})

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel