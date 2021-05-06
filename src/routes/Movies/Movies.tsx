import { Box, makeStyles } from '@material-ui/core';
import MainAppbar from '../../components/MainAppbar/MainAppbar';
import MoviesGrid from '../../components/MoviesGrid/MoviesGrid';
import { useAppSelector } from '../../redux/hooks';
import { moviesTrending } from '../../redux/selectors';
import MoviesSearch from './MoviesSearch';

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

  const movies = useAppSelector(moviesTrending);

  return (
    <Box className={styles.container}>
      <MainAppbar Left={MoviesSearch} />
      <MoviesGrid movies={movies} type='movies' />
    </Box>
  );
};

export default Movies;
