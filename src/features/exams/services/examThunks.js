import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../shared/api';

export const fetchExams = createAsyncThunk(
  'exams/fetchExams',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await api.get('/api/exams', {
        headers: {
          'Authorization': `Bearer ${getState().auth.token}`
        }
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        return [
          { id: 'exam-1', title: 'Quarterly Exam', date: '2026-08-10' },
          { id: 'exam-2', title: 'Mid-Term Exam', date: '2026-09-15' }
        ];
      }
      return rejectWithValue(error.response.data || { message: 'Unable to load exams.' });
    }
  }
);

export const createExam = createAsyncThunk('exams/createExam', async (exam, { rejectWithValue }) => {
  try {
    const response = await api.post('/api/exams', exam);
    return response.data;
  } catch (error) {
    if (!error.response) {
      return { ...exam, id: `${Date.now()}` };
    }
    return rejectWithValue(error.response.data || { message: 'Unable to create exam.' });
  }
});

export const updateExam = createAsyncThunk('exams/updateExam', async (exam, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/exams/${exam.id}`, exam);
    return response.data;
  } catch (error) {
    if (!error.response) {
      return exam;
    }
    return rejectWithValue(error.response.data || { message: 'Unable to update exam.' });
  }
});

export const deleteExam = createAsyncThunk('exams/deleteExam', async (examId, { rejectWithValue }) => {
  try {
    await api.delete(`/api/exams/${examId}`);
    return examId;
  } catch (error) {
    if (!error.response) {
      return examId;
    }
    return rejectWithValue(error.response.data || { message: 'Unable to remove exam.' });
  }
});