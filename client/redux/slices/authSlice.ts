import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "../../src/axios";
import {RegisterValuesType} from "../../src/types.ts";
// import type { PayloadAction } from '@reduxjs/toolkit'

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: RegisterValuesType) => {
    const { data } = await axios.post('/auth/register', params);

    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');

    return data;
})

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
    const { data } = await axios.post('/auth/login', params);

    return data;
})

interface AuthState {
  data: string | null;
  loading: 'pending' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  data: null,
  loading: 'pending',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.data = null;
        state.loading = 'pending';
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.data = null;
        state.loading = 'failed';
      })

      .addCase(fetchAuthMe.pending, (state) => {
        state.data = null;
        state.loading = 'pending';
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.loading = 'failed';
      })

      .addCase(fetchLogin.pending, (state) => {
        state.data = null;
        state.loading = 'pending';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.data = null;
        state.loading = 'failed';
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer