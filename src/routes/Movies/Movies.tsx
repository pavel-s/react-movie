import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getTrending } from '../../redux/moviesReducer';
import { moviesTrending } from '../../redux/selectors';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
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
    <Grid container spacing={2} className={styles.container}>
      {cards}
    </Grid>
  );
};

export default Movies;
