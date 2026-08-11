import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../shared/api';

const toUser = (data) => ({
  id: data._id || data.id,
  name: data.name,
  role: data.role ? String(data.role).toLowerCase() : data.role
});

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/auth/login', {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
    });
    const authHeader = response.headers?.authorization || response.headers?.['x-auth-token'];
    return {
      user: toUser(response.data),
      token: authHeader ? String(authHeader).replace(/^Bearer\s+/i, '') : 'demo-token'
    };
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

export const loginTeacher = createAsyncThunk('auth/loginTeacher', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/auth/login', {
      name: credentials.name,
      accessCode: credentials.accessCode
    });
    const authHeader = response.headers?.authorization || response.headers?.['x-auth-token'];
    return {
      user: toUser(response.data),
      token: authHeader ? String(authHeader).replace(/^Bearer\s+/i, '') : 'demo-token'
    };
  } catch (error) {
    if (!error.response) {
      return {
        user: {
          id: '2',
          name: credentials.name,
          role: 'teacher'
        },
        token: 'demo-token'
      };
    }
    return rejectWithValue(error.response.data || { message: 'Unable to login' });
  }
});
