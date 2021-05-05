import { Box, Grid, makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import MainAppbar from '../../components/MainAppbar/MainAppbar';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getTrending } from '../../redux/moviesReducer';
import { moviesTrending } from '../../redux/selectors';

const useStyles = makeStyles((theme) => ({
  container: { backgroundColor: theme.palette.background.default },
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

  const cards = movies.map((movie) => (
    <Grid item key={String(movie.id)}>
      <MovieCard movie={movie} />
    </Grid>
  ));

  return (
    <Box className={styles.container}>
      <MainAppbar />
      <Grid container spacing={2} className={styles.grid}>
        {cards}
      </Grid>
    </Box>
  );
};

export default Movies;
