import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../src/axios";
import {PostType} from "../../src/types.ts";
// import type { PayloadAction } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('posts/getAll', async () => {
    try {
      const { data } = await axios.get('/posts');

      return data;

    } catch (err) {
      console.log(err);
    }
})

export const deletePost = createAsyncThunk('posts/delete', async (id: string) => {
    try {
      const { data } = await axios.delete(`/posts/${id}`);

      console.log(data);

      return data;
    } catch (err) {
      console.log(err);
    }
})

interface PostsState {
  items: PostType[];
  loading: 'pending' | 'succeeded' | 'failed';
}

const initialState: PostsState = {
  items: [],
  loading: 'pending',
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Posts fetching
      .addCase(fetchPosts.pending, (state) => {
        state.items = [];
        state.loading = 'pending';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.items = [];
        state.loading = 'failed';
      })

      // Post deleting
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post._id !== action.meta.arg);
      })
  },
})

// export const {  } = postsSlice.actions

export default postsSlice.reducer