import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {PostType} from "../../src/types.ts";
// import type { PayloadAction } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('posts/getAll', async () => {
    try {
      const { data } = await axios.get('http://localhost:4444/posts');

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
  reducers: {

  },
  extraReducers: (builder) => {
    builder
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
  },
})

// export const {  } = postsSlice.actions

export default postsSlice.reducer