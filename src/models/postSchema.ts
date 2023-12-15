import{ Schema } from "mongoose";

export const postSchema = new Schema({
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