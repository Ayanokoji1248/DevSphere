import mongoose, { model, Schema } from "mongoose";

const messageSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    message: String,
}, {
    timestamps: true
})

export const messageModel = model("message", messageSchema);
