import { combineReducers, configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesReducer';
import userReducer from './userReducer';
import watchedReducer from './watchedReducer';
import watchListReducer from './watchListReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  watchList: watchListReducer,
  user: userReducer,
  watched: watchedReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
