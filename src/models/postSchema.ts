import { Schema } from "mongoose";
import type { Post } from "@/types/posts/Posts";

export const postSchema = new Schema({
    userId: {
        type: Number,
    },
    name: {
        type: String
    },
    username: {
        type: String
    },
    id: {
        type: Number
    },
    retweet: {
        type: Boolean
    },
    extraComment: {
        type: String
    },
    title: {
        type: String,
    },
    body: {
        type: String
    },
    imageURL: {
        type: String
    },
    likes: {
        amount: {
            type: Number,
        },
        active: {
            type: Boolean
        }
    },
    retweets: {
        amount: {
            type: Number,
        },
        active: {
            type: Boolean
        }
    },
    comments: {
        type: []
    }
});