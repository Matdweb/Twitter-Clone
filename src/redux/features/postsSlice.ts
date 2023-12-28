import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Post } from "@/types/posts/Posts";
import type { comment } from "@/types/posts/comments/comment";
import type { RootState } from "../store";

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

export const toggleLikePost = createAsyncThunk('posts/toggleLikePost',
    async (postId: number, thunkAPI) => {
        const { userReducer: { user } } = thunkAPI.getState() as RootState;
        const email = user?.email || "";

        if (postId > 100) {
            const post = user?.posts.find((post) => {
                return post.id === postId;
            });

            const newLikes = post ? post.likes.active ? post.likes.amount - 1 : post.likes.amount + 1 : 0;
            const newActive = !(post?.likes.active) || false;

            const response = await fetch('/api/posts/likePost', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, postId, newLikes, newActive })
            });

            const { status } = await response.json();
            if (status !== 201) return null;
        }

        return postId;
    })

export const addComment = createAsyncThunk('posts/addComment',
    async ({ postId, comment }: { postId: number, comment: comment }, thunkAPI) => {
        const { userReducer: { user }, postsReducer: { posts } } = thunkAPI.getState() as RootState;

        const [post] = posts.filter((post) => {
            return post.id === postId;
        });

        const postToComment = postId > 100 &&
            user?.posts.find((post) => {
                return post.id === postId;
            })
            ||
            post;

        comment = {
            ...comment,
            id: postToComment.comments.length > 0 ? postToComment.comments[postToComment.comments.length - 1].id + 1 : 0,
            username: user?.name || "Name",
        };

        if (postId > 100) {
            const response = await fetch('/api/posts/addComment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user?.email || "", postId, comment })
            });

            const { status } = await response.json();
            if (status !== 201) return null;
        }

        return {
            ...postToComment,
            comments: [...postToComment.comments, comment]
        };

    })

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
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
        },
        addPost: (state, { payload }: { payload: Post }) => {
            state.posts = [payload, ...state.posts];
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

        builder.addCase(addComment.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(addComment.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload !== null) {
                state.posts = state.posts.map((post) => {
                    if (payload.id === post.id) {
                        return {
                            ...payload
                        }
                    } else {
                        return post;
                    }
                })
            }
        });

        builder.addCase(addComment.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
        });

        builder.addCase(toggleLikePost.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(toggleLikePost.fulfilled, (state, { payload }) => {
            state.isLoading = false;
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
        });

        builder.addCase(toggleLikePost.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
        });
    }
})

export const { toggleRetweetPost, addPost } = postsSlice.actions;
export default postsSlice.reducer;