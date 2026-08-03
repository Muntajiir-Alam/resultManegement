import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from './axiosConfig';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authApi.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (!error.response) {
      const isAdmin = credentials.role === 'admin';
      return {
        user: {
          id: isAdmin ? '1' : '2',
          name: isAdmin ? credentials.email : credentials.name,
          role: credentials.role
        },
        token: 'demo-token'
      };
    }
    return rejectWithValue(error.response.data || { message: 'Unable to login' });
  }
});

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authApi.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      if (!error.response) {
        return { message: 'Password reset link sent to your email.' };
      }
      return rejectWithValue(error.response.data || { message: 'Unable to submit request' });
    }
  }
);