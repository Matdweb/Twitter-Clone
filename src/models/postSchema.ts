import { Schema } from "mongoose";
import { commentsSchema } from "./commentsSchema";

export const postSchema = new Schema({
    userId: {
        type: String,
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
        type: [String]
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
        type: [commentsSchema]
    }
});