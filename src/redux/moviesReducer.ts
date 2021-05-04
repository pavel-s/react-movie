import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themoviedbAPI, TrendingResponse } from '../api/themoviedb';

const initialState: TrendingResponse = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

// get list of trending movies for last 7 days
export const getTrending = createAsyncThunk(
  'movies/getTrending',
  async (type: 'movie' | 'tv' = 'movie') => {
    const result = await themoviedbAPI.getTrending(type);
    return result ? result : initialState;
  }
);

const moviesSlice = createSlice({
  initialState,
  name: 'movies',
  reducers: {
    moviesReceived(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(
      getTrending.fulfilled,
      (state, action: PayloadAction<TrendingResponse>) => {
        return action.payload;
      }
    );
  },
});

export default moviesSlice.reducer;
