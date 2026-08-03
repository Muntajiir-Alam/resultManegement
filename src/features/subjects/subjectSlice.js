import { createSlice } from '@reduxjs/toolkit';
import { fetchSubjects, saveSubject, removeSubject } from './services/subjectThunks';

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

const subjectSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      })
      .addCase(saveSubject.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeSubject.fulfilled, (state, action) => {
        state.items = state.items.filter((subject) => subject.id !== action.payload);
      });
  }
});

export default subjectSlice.reducer;