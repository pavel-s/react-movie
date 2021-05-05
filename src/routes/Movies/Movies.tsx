import { Box, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import MainAppbar from '../../components/MainAppbar/MainAppbar';
import MoviesGrid from '../../components/MoviesGrid/MoviesGrid';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getTrending } from '../../redux/moviesReducer';
import { moviesTrending } from '../../redux/selectors';

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

const Movies = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const movies = useAppSelector(moviesTrending);

  useEffect(() => {
    dispatch(getTrending());
  }, [dispatch]);

  return (
    <Box className={styles.container}>
      <MainAppbar />
      <MoviesGrid movies={movies} type='movies' />
    </Box>
  );
};

export default Movies;
