import { useEffect } from 'react';
import MainAppbar from '../../components/MainAppbar/MainAppbar';
import MoviesGrid from '../../components/MoviesGrid/MoviesGrid';
import RouteContainer from '../../components/RouteContainer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { watchedMovies, watchedSearchQuery } from '../../redux/selectors';
import { getWatchedList } from '../../redux/watchedReducer';
import WatchedSearch from './WatchedSearch';

const Watched = () => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector(watchedMovies);
  const filterMode = useAppSelector(watchedSearchQuery).length > 0;

  useEffect(() => {
    dispatch(getWatchedList());
  }, [dispatch]);

  return (
    <RouteContainer>
      <MainAppbar Left={WatchedSearch} />
      <MoviesGrid movies={movies} type='watched' filterMode={filterMode} />
    </RouteContainer>
  );
};

export default Watched;
