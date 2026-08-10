import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../shared/api';

export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await api.get('/api/subjects', {
        headers: {
          'Authorization': `Bearer ${getState().auth.token}`
        }
      });
      return response.data;
    } catch (error) {
    if (!error.response) {
      return [
        { id: 'subject-1', name: 'Mathematics', maxMarks: 100 },
        { id: 'subject-2', name: 'English', maxMarks: 100 }
      ];
    }
    return rejectWithValue(error.response.data || { message: 'Unable to load subjects.' });
  }
});

export const saveSubject = createAsyncThunk('subjects/saveSubject', async (subject, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/subjects', subject);
    return response.data;
  } catch (error) {
    if (!error.response) {
      return { ...subject, id: `${Date.now()}` };
    }
    return rejectWithValue(error.response.data || { message: 'Unable to save subject.' });
  }
});

export const removeSubject = createAsyncThunk('subjects/removeSubject', async (subjectId, { rejectWithValue }) => {
  try {
    await api.delete(`/api/subjects/${subjectId}`);
    return subjectId;
  } catch (error) {
    if (!error.response) {
      return subjectId;
    }
    return rejectWithValue(error.response.data || { message: 'Unable to remove subject.' });
  }
});