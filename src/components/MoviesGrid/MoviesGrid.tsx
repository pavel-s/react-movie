import { Grid, makeStyles } from '@material-ui/core';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useAppSelector } from '../../redux/hooks';
import { userWatchedMovies, userWatchList } from '../../redux/selectors';
import { Movie } from '../../types';
import EmptyMovieList from '../EmptyMovieList';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(1),
    marginTop: theme.appBar.height,
    width: '100%',
    justifyContent: 'center',
  },
}));

const MoviesGrid = ({
  movies,
  type,
  filterMode = false,
}: {
  movies: Movie[];
  type: 'movies' | 'watchlist' | 'watched';
  filterMode?: boolean;
}) => {
  const styles = useStyles();
  const watchList = useAppSelector(userWatchList);
  const watchedMovies = useAppSelector(userWatchedMovies);

  const cards = movies.map((movie) => (
    <Grid item key={String(movie.id)}>
      <MovieCard
        movie={movie}
        inWatchList={!!watchList?.find((item) => item.id === movie.id)}
        watched={!!watchedMovies?.find((item) => item.id === movie.id)}
      />
    </Grid>
  ));

  let message = filterMode ? 'no results' : undefined;

  return (
    <Grid container spacing={2} className={styles.grid}>
      {movies.length < 1 ? <EmptyMovieList message={message} /> : cards}
    </Grid>
  );
};

export default MoviesGrid;
