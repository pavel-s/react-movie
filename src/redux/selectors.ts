import { Movie } from '../types';
import { RootState } from './store';

export const moviesTrending = (state: RootState) => state.movies.results;
export const moviesSearchQuery = (state: RootState) => state.movies.query;

export const userWatchList = (state: RootState) => state.user.watchList;
export const watchListItems = (state: RootState) => {
  const initArr: Movie[] = [];
  const filterQuery = state.watchList.filterQuery;

  const items =
    filterQuery.length > 0
      ? Object.values(state.watchList.items).filter((item) =>
          item.movie?.title
            .toLocaleLowerCase()
            .includes(filterQuery.toLocaleLowerCase())
        )
      : Object.values(state.watchList.items);

  return items.reduce((acc, item) => {
    return item.movie ? [...acc, item.movie] : acc;
  }, initArr);
};
export const watchListSearchQuery = (state: RootState) =>
  state.watchList.filterQuery;

export const userWatchedMovies = (state: RootState) => state.user.watched;
export const watchedMovies = (state: RootState) => {
  const initArr: Movie[] = [];
  const filterQuery = state.watched.filterQuery;

  const items =
    filterQuery.length > 0
      ? Object.values(state.watched.items).filter((item) =>
          item.movie?.title
            .toLocaleLowerCase()
            .includes(filterQuery.toLocaleLowerCase())
        )
      : Object.values(state.watched.items);

  return items.reduce((acc, item) => {
    return item.movie ? [...acc, item.movie] : acc;
  }, initArr);
};
export const watchedSearchQuery = (state: RootState) =>
  state.watchList.filterQuery;
