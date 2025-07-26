"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "post"
        }],
    projects: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "project"
        }]
}, {
    timestamps: true,
});
const userModal = mongoose_1.default.model("user", userSchema);
exports.default = userModal;
