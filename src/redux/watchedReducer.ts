import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themoviedbAPI } from '../api/themoviedb';
import { WatchedState, WatchedStateItem } from './reduxTypes';
import { RootState } from './store';

const initialState: WatchedState = {};

const watchedSlice = createSlice({
  initialState,
  name: 'watched',
  reducers: {
    watchedSetItem(state, action: PayloadAction<WatchedStateItem>) {
      state[action.payload.id] = action.payload;
    },
    watchedRemoveItem(state, action: PayloadAction<{ id: number }>) {
      delete state[action.payload.id];
    },
  },
});

export const { watchedSetItem, watchedRemoveItem } = watchedSlice.actions;

export const getWatchedList = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
  }
>('watched/getWatchedMovies', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const userWatched = state.user.watched;
  const watchedState = state.watched;

  // fetch movies from user watched if they not fetched yet
  userWatched.forEach(async (item) => {
    const watchListStateItem = watchedState[item.id];

    if (
      !watchListStateItem ||
      watchListStateItem.status === 'error' ||
      watchListStateItem.status === 'ready'
    ) {
      const movie = await themoviedbAPI.getMovie(item.id);
      if (movie) {
        thunkApi.dispatch(
          watchedSetItem({
            ...item,
            status: 'success',
            movie: movie,
          })
        );
      }
    }
  });
});

export default watchedSlice.reducer;
