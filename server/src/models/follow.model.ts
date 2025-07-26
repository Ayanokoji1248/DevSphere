import mongoose, { model, Schema } from "mongoose";

const followSchema = new Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }

}, {
    timestamps: true
})

const followModel = model("follow", followSchema)
export default followModel;