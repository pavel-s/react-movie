import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './reduxTypes';
import { RootState } from './store';
import { watchedRemoveItem, watchedSetItem } from './watchedReducer';
import { watchListRemoveItem, watchListSetItem } from './watchListReducer';

const initialState: UserState = {
  watchList: [],
  watched: [],
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    userWatchListItemRemoved(state, action: PayloadAction<{ id: number }>) {
      const index = state.watchList.findIndex(
        (movie) => movie.id === action.payload.id
      );
      if (index > -1) {
        state.watchList.splice(index, 1);
      }
    },
    userWatchListItemAdded(
      state,
      action: PayloadAction<{ id: number; dateAdded: number }>
    ) {
      state.watchList.push({
        id: action.payload.id,
        dateAdded: action.payload.dateAdded,
      });
    },
    userWatchedItemRemoved(state, action: PayloadAction<{ id: number }>) {
      const index = state.watched.findIndex(
        (movie) => movie.id === action.payload.id
      );
      if (index > -1) {
        state.watched.splice(index, 1);
      }
    },
    userWatchedItemAdded(
      state,
      action: PayloadAction<{ id: number; dateAdded: number }>
    ) {
      state.watched.push({
        id: action.payload.id,
        dateAdded: action.payload.dateAdded,
      });
    },
  },
});

const {
  userWatchListItemAdded,
  userWatchListItemRemoved,
  userWatchedItemAdded,
  userWatchedItemRemoved,
} = userSlice.actions;

// watch list
export const userWatchListAddItem = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('user/watchListAddItem', (id: number, thunkApi) => {
  const dateAdded = Date.now();
  thunkApi.dispatch(userWatchListItemAdded({ id, dateAdded }));
  thunkApi.dispatch(watchListSetItem({ id, dateAdded, status: 'ready' }));
});

export const userWatchListRemoveItem = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('user/watchListRemoveItem', (id: number, thunkApi) => {
  thunkApi.dispatch(userWatchListItemRemoved({ id }));
  thunkApi.dispatch(watchListRemoveItem({ id }));
});

// watched
export const userWatchedAddItem = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('user/watchedAddItem', (id: number, thunkApi) => {
  const dateAdded = Date.now();
  thunkApi.dispatch(userWatchedItemAdded({ id, dateAdded }));
  thunkApi.dispatch(watchedSetItem({ id, dateAdded, status: 'ready' }));
});

export const userWatchedRemoveItem = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('user/watchedRemoveItem', (id: number, thunkApi) => {
  thunkApi.dispatch(userWatchedItemRemoved({ id }));
  thunkApi.dispatch(watchedRemoveItem({ id }));
});

export default userSlice.reducer;
