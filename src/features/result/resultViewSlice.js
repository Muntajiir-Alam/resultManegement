import { createSlice } from '@reduxjs/toolkit';
import { fetchResult } from './services/resultViewThunks';

const initialState = {
  report: null,
  status: 'idle',
  error: null
};

const resultViewSlice = createSlice({
  name: 'resultView',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResult.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchResult.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.report = action.payload;
      })
      .addCase(fetchResult.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      });
  }
});

export default resultViewSlice.reducer;