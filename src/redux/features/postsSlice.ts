import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Post } from "@/types/posts/Posts";

type PostsState = {
    isLoading: boolean,
    posts: [] | Post[],
    error: boolean
}

const initialState: PostsState = {
    isLoading: false,
    posts: [],
    error: false
};

export const fecthPosts = createAsyncThunk('posts/fetchPosts',
    async (lastPostId: number) => {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lastPostId })
        });

        const { posts } = await response.json();

        return posts;
    })

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addNewPost: (state, action: PayloadAction<Post>) => {
            state.posts = [...state.posts, { ...action.payload }]
        },
        addPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = [...state.posts, ...action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fecthPosts.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fecthPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = [...state.posts, ...action.payload];
        });

        builder.addCase(fecthPosts.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
        });
    }
})

export const { addNewPost, addPosts } = postsSlice.actions;

export default postsSlice.reducer;