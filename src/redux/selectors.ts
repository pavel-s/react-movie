import { RootState } from './store';

export const moviesTrending = (state: RootState) => state.movies.results;
