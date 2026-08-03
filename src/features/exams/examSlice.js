import { createSlice } from '@reduxjs/toolkit';
import { fetchExams, createExam, updateExam, deleteExam } from './services/examThunks';

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

const examSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  }
});

export default examSlice.reducer;