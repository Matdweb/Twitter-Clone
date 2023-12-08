import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema({
    userId: {
        type: Number,
    },
    id: {
        type: Number
    },
    title: {
        type: String,
    },
    body: {
        type: String
    },
    imageURL: {
        type: String
    }
})

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