import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import postsReducer from './features/postsSlice'

export const store = configureStore({ 
    reducer: {
        counterReducer,
        postsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;