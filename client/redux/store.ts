import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../redux/slices/postsSlice';
import authReducer from '../redux/slices/authSlice';
import {api} from "./api/api.ts";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,

    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
