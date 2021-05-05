import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themoviedbAPI } from '../api/themoviedb';
import { WatchListState, WatchListStateItem } from './reduxTypes';
import { RootState } from './store';

const initialState: WatchListState = {};

const watchListSlice = createSlice({
  initialState,
  name: 'watchList',
  reducers: {
    watchListSetItem(state, action: PayloadAction<WatchListStateItem>) {
      state[action.payload.id] = action.payload;
    },
    watchListRemoveItem(state, action: PayloadAction<{ id: number }>) {
      delete state[action.payload.id];
    },
  },
});

export const { watchListSetItem, watchListRemoveItem } = watchListSlice.actions;

export const getWatchListMovies = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
  }
>('watchList/getWatchListMovies', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const userWatchList = state.user.watchList;
  const watchListState = state.watchList;

  // fetch movies from user watchList if they not fetched yet
  userWatchList.forEach(async (item) => {
    const watchListStateItem = watchListState[item.id];

    if (
      !watchListStateItem ||
      watchListStateItem.status === 'error' ||
      watchListStateItem.status === 'ready'
    ) {
      const movie = await themoviedbAPI.getMovie(item.id);
      if (movie) {
        thunkApi.dispatch(
          watchListSetItem({
            ...item,
            status: 'success',
            movie: movie,
          })
        );
      }
    }
  });
});

export default watchListSlice.reducer;
