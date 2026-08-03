import { createSlice } from '@reduxjs/toolkit';
import { fetchMeritList } from './services/meritThunks';

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

const meritSlice = createSlice({
  name: 'merit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeritList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMeritList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMeritList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      });
  }
});

export default meritSlice.reducer;