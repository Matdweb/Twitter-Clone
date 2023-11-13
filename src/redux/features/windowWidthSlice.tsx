import { createSlice } from "@reduxjs/toolkit";

const windowWidthSlice = createSlice({
    name: "windowWidth",
    initialState: 0,
    reducers: {
        setWindowWidth: (state: number, action) => {
            return state = action.payload
        }
    }
});

export const { setWindowWidth } = windowWidthSlice.actions;
export default windowWidthSlice.reducer;