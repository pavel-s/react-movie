import { useEffect } from 'react';
import AppContainer from '../../components/AppContainer/AppContainer';
import MainAppbar from '../../components/MainAppbar/MainAppbar';
import MoviesGrid from '../../components/MoviesGrid/MoviesGrid';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { watchListItems, watchListSearchQuery } from '../../redux/selectors';
import { getWatchListMovies } from '../../redux/watchListReducer';
import WatchListSearch from './WatchListSearch';

const WatchList = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(watchListItems);
  const filterMode = useAppSelector(watchListSearchQuery).length > 0;

  useEffect(() => {
    dispatch(getWatchListMovies());
  }, [dispatch]);

  return (
    <AppContainer>
      <MainAppbar Left={WatchListSearch} />
      <MoviesGrid movies={movies} type='watchlist' filterMode={filterMode} />
    </AppContainer>
  );
};

export default WatchList;
