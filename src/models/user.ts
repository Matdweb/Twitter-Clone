import mongoose, { Schema, models } from "mongoose";
import { postSchema } from "./postSchema";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profileImage: {
            type: {
                url: String,
                thumbnailUrl: String
            },
            required: false
        },
        bio: {
            type: String,
            required: false
        },
        web_page: {
            type: {
                name: String,
                url: String
            },
            required: false
        },
        posts: {
            type: [postSchema],
            required: true
        },
        country: {
            type: String,
            required: true
        },
        followers: {
            type: Number,
            required: true
        },
        following: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;