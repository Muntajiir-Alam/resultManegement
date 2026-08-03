import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../shared/api';

export const fetchMeritList = createAsyncThunk('merit/fetchMeritList', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/merit');
    return response.data;
  } catch (error) {
    if (!error.response) {
      return [
        { id: 'rank-1', name: 'Ayesha Noor', total: 282, rank: 1 },
        { id: 'rank-2', name: 'Ali Rahman', total: 268, rank: 2 },
        { id: 'rank-3', name: 'Sara Khan', total: 255, rank: 3 }
      ];
    }
    return rejectWithValue(error.response.data || { message: 'Unable to fetch merit list.' });
  }
});