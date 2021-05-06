import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  themoviedbAPI,
  TrendingResponse,
  SearchResponse,
} from '../api/themoviedb';

const initialState: TrendingResponse & { query: string } = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  query: '',
};

// get list of trending movies for last 7 days
export const getTrending = createAsyncThunk(
  'movies/getTrending',
  async (type: 'movie' | 'tv' = 'movie') => {
    const result = await themoviedbAPI.getTrending(type);
    return result ? result : initialState;
  }
);

// get list of trending movies for last 7 days
export const searchMovies = createAsyncThunk<
  SearchResponse,
  { query: string; page?: number }
>('movies/searchMovies', async ({ query, page }) => {
  const result = await themoviedbAPI.searchMovies(query, page);
  return result ? result : initialState;
});

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
        return { ...state, ...action.payload };
      }
    );
    builder.addCase(
      searchMovies.fulfilled,
      (state, action: PayloadAction<SearchResponse>) => {
        return { ...state, ...action.payload };
      }
    );
  },
});

export default moviesSlice.reducer;
