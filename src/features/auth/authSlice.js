import { createSlice } from '@reduxjs/toolkit';
import { login, loginTeacher } from './services/authThunks';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: 'idle',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    const pending = (state) => {
      state.status = 'loading';
      state.error = null;
    };
    const fulfilled = (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    };
    const rejected = (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.message || 'Login failed';
    };

    builder
      .addCase(login.pending, pending)
      .addCase(login.fulfilled, fulfilled)
      .addCase(login.rejected, rejected)
      .addCase(loginTeacher.pending, pending)
      .addCase(loginTeacher.fulfilled, fulfilled)
      .addCase(loginTeacher.rejected, rejected);
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;