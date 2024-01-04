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


export const addComment = createAsyncThunk('posts/addComment',
    async ({ userId, postId, comment }: { userId: string, postId: number, comment: comment }, thunkAPI) => {
        const { userReducer: { user }, postsReducer: { posts } } = await thunkAPI.getState() as RootState;

        if (postId > 100) {
            comment.username = user?.name || "Name";
            const response = await fetch('/api/posts/addComment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, postId, comment })
            });

            const { status, post } = await response.json();
            if (status !== 201) return null;

            return post
        } else {
            const postToComment = posts.find((post) => post.id === postId)

            if (postToComment) {
                comment = {
                    ...comment,
                    id: postToComment.comments.length > 0 ? postToComment?.comments[postToComment?.comments.length - 1].id + 1 : 0,
                    username: user?.name || "Name",
                };

                return {
                    ...postToComment,
                    comments: [...postToComment.comments, comment]
                };
            }

            return null;
        }

    })

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        toggleLikePost: (state, { payload }: {
            payload: {
                userId: string,
                postId: number
            }
        }) => {
            state.posts = state.posts.map(({ id, likes, ...rest }) => {
                if (id === payload.postId) {
                    const isIncluded = likes.userIds.includes(payload.userId);
                    const newAmount = isIncluded
                        ?
                        likes.amount - 1
                        :
                        likes.amount + 1;
                    const newUserIds = isIncluded
                        ?
                        likes.userIds.filter((user_id) => user_id !== payload.userId)
                        :
                        [...likes.userIds, payload.userId];
                    return {
                        id, likes: {
                            userIds: newUserIds,
                            amount: newAmount
                        }, ...rest
                    }
                } else {
                    return { id, likes, ...rest }
                }
            })
        },
        toggleRetweetPost: (state, { payload }: { payload: number }) => {
            state.posts = state.posts.map(({ id, retweets, ...rest }) => {
                if (id === payload) {
                    const newRetweets = retweets.active ? retweets.amount - 1 : retweets.amount + 1
                    return {
                        id,
                        retweets: {
                            amount: newRetweets,
                            active: !retweets.active
                        },
                        ...rest,
                    }
                } else {
                    return {
                        id, retweets, ...rest
                    }
                }
            })
        },
        addPost: (state, { payload }: { payload: Post }) => {
            state.posts = [payload, ...state.posts];
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
    }
})

export const { addPost, toggleLikePost, toggleRetweetPost } = postsSlice.actions;
export default postsSlice.reducer;