import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/User/User";

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
    }
});

export default userSlice.reducer;