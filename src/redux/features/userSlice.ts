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

        const response = await fetch('/api/user/addPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, post })
        });

        const { status, retweetedPost } = await response.json();
        if (status !== 201) { console.log(status); return null; }
        return retweetedPost;
    });

export const findPost = createAsyncThunk('user/findPost',
    async ({ userId, postId }: { userId: string, postId: number }, thunkAPI) => {

        const response = await fetch('/api/posts/findPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, postId })
        });

        const { status, post } = await response.json();
        if (status !== 201) return null;
        return post;
    })

export const toggleLikeUserPost = createAsyncThunk('posts/toggleLikePost',
    async ({
        userId, post
    }: {
        userId: string,
        post: {
            id: number,
            userId: string
        }
    }) => {

        try {
            const response = await fetch('/api/posts/likePost', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, post })
            });

            const { status }: { status: number, likedPost: Post } = await response.json(); 4
            if (status !== 201) return null;

            return { userId, postId: post.id };
        } catch (e) {
            console.log(e);
        }
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
            if (state.user && action.payload) {
                state.user.posts = [action.payload, ...state.user.posts]
            }
        });

        builder.addCase(addUserPost.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
        });

        builder.addCase(findPost.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(findPost.fulfilled, (state) => {
            state.isLoading = false;
        });

        builder.addCase(findPost.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
        });

        builder.addCase(toggleLikeUserPost.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(toggleLikeUserPost.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (state.user && payload) {
                state.user.posts = state.user.posts.map((postToUpdate) => {
                    if (postToUpdate.id === payload.postId && state.user) {
                        const isIncluded = postToUpdate.likes.userIds.includes(state.user._id);
                        if (isIncluded) {
                            postToUpdate.likes.userIds.filter((user_id) => user_id !== state.user?._id);
                        } else {
                            postToUpdate.likes.userIds.push(state.user?._id);
                        }
                        return {
                            ...postToUpdate,
                        }
                    } else {
                        return { ...postToUpdate }
                    }
                })
            }
        });

        builder.addCase(toggleLikeUserPost.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
        });
    }
});

export default userSlice.reducer;