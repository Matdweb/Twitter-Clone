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
        posts: {
            type: [postSchema],
            required: true
        }
    },
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;