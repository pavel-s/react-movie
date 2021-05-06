import { Movie } from '../types';
import { RootState } from './store';

export const moviesTrending = (state: RootState) => state.movies.results;
export const moviesSearchQuery = (state: RootState) => state.movies.query;

export const userWatchList = (state: RootState) => state.user.watchList;
export const watchListItems = (state: RootState) => {
  const initArr: Movie[] = [];
  return Object.values(state.watchList).reduce((acc, item) => {
    return item.movie ? [...acc, item.movie] : acc;
  }, initArr);
};

export const userWatchedMovies = (state: RootState) => state.user.watched;
export const watchedMovies = (state: RootState) => {
  const initArr: Movie[] = [];
  return Object.values(state.watched).reduce((acc, item) => {
    return item.movie ? [...acc, item.movie] : acc;
  }, initArr);
};
