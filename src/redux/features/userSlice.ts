import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/User/User";
import type { Post } from "@/types/posts/Posts";
import { RootState } from "../store";

interface initialState {
    isLoading: boolean,
    user: User,
    error: boolean
}

const initialState: initialState = {
    isLoading: false,
    user: null,
    error: false
};

export const fetchUser = createAsyncThunk('user/fetchUser',
    async (email: string) => {
        const response = await fetch('/api/user/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const { user } = await response.json();

        return user;
    })

export const addUserPost = createAsyncThunk('user/addUserPost',
    async (post: Post, thunkAPI) => {

        const { userReducer: { user } } = thunkAPI.getState() as RootState;
        const email = user?.email;
        const lastPostId: number = user && user.posts.length > 0 && user.posts[0].id || 100;
        post.id = lastPostId + 1;

        const response = await fetch('/api/user/addPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, post })
        });

        const { status } = await response.json();
        return post;
    });

export const findPost = createAsyncThunk('user/findPost',
    async (postId: number, thunkAPI) => {
        const { userReducer: { user } } = thunkAPI.getState() as RootState;
        const email = user?.email || "";

        const response = await fetch('/api/posts/findPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, postId })
        });

        const { status, post } = await response.json();
        if (status !== 201) return null;
        return post;
    })

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = { ...action.payload }
        });

        builder.addCase(fetchUser.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
        });

        builder.addCase(addUserPost.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(addUserPost.fulfilled, (state, action) => {
            state.isLoading = false;
            if (state.user) {
                state.user.posts = [action.payload, ...state.user.posts]
            }
        });

        builder.addCase(addUserPost.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
        });
    }
});

export default userSlice.reducer;