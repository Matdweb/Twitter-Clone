import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './features/postsSlice'
import windowWidthReducer from "./features/windowWidthSlice";
import responsiveMenuReducer from "./features/responsiveMenuSlice";

export const store = configureStore({ 
    reducer: {
        postsReducer,
        windowWidth: windowWidthReducer,
        responsiveMenu: responsiveMenuReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;