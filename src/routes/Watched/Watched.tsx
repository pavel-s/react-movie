import { Box, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import MainAppbar from '../../components/MainAppbar/MainAppbar';
import MoviesGrid from '../../components/MoviesGrid/MoviesGrid';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { watchedMovies, watchedSearchQuery } from '../../redux/selectors';
import { getWatchedList } from '../../redux/watchedReducer';
import WatchedSearch from './WatchedSearch';

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

const Watched = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const movies = useAppSelector(watchedMovies);
  const filterMode = useAppSelector(watchedSearchQuery).length > 0;

  useEffect(() => {
    dispatch(getWatchedList());
  }, [dispatch]);

  return (
    <Box className={styles.container}>
      <MainAppbar Left={WatchedSearch} />
      <MoviesGrid movies={movies} type='watched' filterMode={filterMode} />
    </Box>
  );
};

export default Watched;
