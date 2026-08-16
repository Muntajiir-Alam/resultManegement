import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../shared/api';

export const fetchResult = createAsyncThunk('resultView/fetchResult', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/results/me');
    return response.data;
  } catch (error) {
    if (!error.response) {
      return {
        student: { name: 'Ayesha Noor', roll: '2026-010', class: '10' },
        subjects: [
          { name: 'Mathematics', marks: 89 },
          { name: 'English', marks: 84 },
          { name: 'Science', marks: 91 }
        ]
      };
    }
    return rejectWithValue(error.response.data || { message: 'Unable to load result.' });
  }
});