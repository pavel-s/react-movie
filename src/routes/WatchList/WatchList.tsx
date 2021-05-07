import { Box, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import MainAppbar from '../../components/MainAppbar/MainAppbar';
import MoviesGrid from '../../components/MoviesGrid/MoviesGrid';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { watchListItems, watchListSearchQuery } from '../../redux/selectors';
import { getWatchListMovies } from '../../redux/watchListReducer';
import WatchListSearch from './WatchListSearch';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    minHeight: `calc(100vh - ${theme.appBar.height}px)`,
  },
  grid: {
    padding: theme.spacing(1),
    marginTop: theme.appBar.height,
    width: '100%',
  },
}));

const WatchList = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const movies = useAppSelector(watchListItems);

  const filterMode = useAppSelector(watchListSearchQuery).length > 0;

  useEffect(() => {
    dispatch(getWatchListMovies());
  }, [dispatch]);

  return (
    <Box className={styles.container}>
      <MainAppbar Left={WatchListSearch} />
      <MoviesGrid movies={movies} type='watchlist' filterMode={filterMode} />
    </Box>
  );
};

export default WatchList;
