import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    username: {
        type: String,
        minLength: [5, "Atleast 5 character"],
        required: true,
        trim: true,
        unique: true,
    },
    fullName: {
        type: String,
        minLength: [8, "Atleast 8 character"],
        required: true,
    },
    email: {
        type: String,
        minLength: [8, "Atleast 8 character"],
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: [6, "Atleast 6 character"],
        required: true,
        trim: true
    },
    profilePic: {
        type: String,
        default: "profilePic.png"
    },
    bannerImage: {
        type: String,
        default: "bannerImage.png"
    },
    headline: {
        type: String,
        minLength: [5, "Atleast 5 Character"]
    },
    bio: {
        type: String,
        minLength: [10, "Atleast 10 Character"],
        maxLength: [500, "Not more than 500 characters"]
    },
    skills: {
        type: [String],
        default: []
    },
    address: {
        type: String
    },
    portfolioLink: String,
    // following: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "follow"
    // }],
    // follower: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "follow"
    // }],
    followerCount: {
        type: Number,
        default: 0
    },
    followingCount: {
        type: Number,
        default: 0
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
    }]

}, {
    timestamps: true,
})


const userModal = mongoose.model("user", userSchema);

export default userModal