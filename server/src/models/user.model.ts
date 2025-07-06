import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    username: String,
    fullName: String,
    avatar: String,
    bannerImage: String,
    devName: String,
    bio: String,
    skills: [String],
    address: String,
    porfolioLink: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    follower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
    }]

}, {
    timestamps: true,
})


