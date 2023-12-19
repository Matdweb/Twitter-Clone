import { Schema } from "mongoose";

export const postSchema = new Schema({
    userId: {
        type: Number,
    },
    retweet: {
        type: Boolean
    },
    extraComment: {
        type: String
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