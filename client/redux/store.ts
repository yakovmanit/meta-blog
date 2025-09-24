// redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { postsApi } from './api/postsApi'
import authSlice from './slices/authSlice'

export const store = configureStore({
  reducer: {
    // RTK Query API reducer
    [postsApi.reducerPath]: postsApi.reducer,

    auth: authSlice,
    // posts: postsSlice, // TODO: delete
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch