import { Schema } from "mongoose";

export const commentsSchema = new Schema({
    id: {
        type: Number,
    },
    body: {
        type: String
    },
    username: {
        type: String
    },
    userId: {
        type: String
    }
});