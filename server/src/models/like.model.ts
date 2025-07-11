import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

const likeModel = mongoose.model("like", likeSchema)

export default likeModel