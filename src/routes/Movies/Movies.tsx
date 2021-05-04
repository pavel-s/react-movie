import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { themoviedbAPI } from '../../api/themoviedb';
import MovieCard from '../../components/MovieCard/MovieCard';
import { Movie } from '../../types';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
}));

const Movies = () => {
  const styles = useStyles();

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getList = async () => {
      const trendingResponse = await themoviedbAPI.getTrending();
      if (trendingResponse) {
        setMovies(trendingResponse.results);
      }
    };
    getList();
  }, []);

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
