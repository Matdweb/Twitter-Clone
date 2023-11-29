import { createSlice } from "@reduxjs/toolkit";

const responsiveMenuSlice = createSlice({
    name: "responsiveMenu",
    initialState: false,
    reducers: {
        toggleResponsiveMenu: (state) => {
            return state = !state;
        }
    }
});

export const {toggleResponsiveMenu} = responsiveMenuSlice.actions;
export default responsiveMenuSlice.reducer;