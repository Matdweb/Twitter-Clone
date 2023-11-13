import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './features/postsSlice'
import windowWidthReducer from "./features/windowWidthSlice";

export const store = configureStore({ 
    reducer: {
        postsReducer,
        windowWidth: windowWidthReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;