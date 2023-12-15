import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
        toggleLikePost: (state, { payload }: { payload: number }) => {
            state.posts = state.posts.map(({ id, likes, ...rest }) => {
                if (id === payload) {
                    const newLikes = likes.active ? likes.amount - 1 : likes.amount + 1
                    return {
                        id,
                        likes: {
                            amount: newLikes,
                            active: !likes.active
                        },
                        ...rest,
                    }
                } else {
                    return {
                        id, likes, ...rest
                    }
                }
            })
        },
        toggleRetweetPost: (state, { payload }: { payload: number }) => {
            state.posts = state.posts.map(({ id, likes, retweets, ...rest }) => {
                if (id === payload) {
                    const newRetweets = retweets.amount + 1
                    return {
                        id,
                        likes,
                        retweets: {
                            amount: newRetweets,
                            active: !retweets.active
                        },
                        ...rest,
                    }
                } else {
                    return {
                        id, likes, retweets, ...rest
                    }
                }
            })
        }
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

export const { toggleLikePost, toggleRetweetPost } = postsSlice.actions;
export default postsSlice.reducer;