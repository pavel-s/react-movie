import { Box } from '@mui/material';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useAppSelector } from '../../redux/hooks';
import { userWatchedMovies, userWatchList } from '../../redux/selectors';
import { Movie } from '../../types';
import EmptyMovieList from '../EmptyMovieList';

const MoviesGrid = ({
  movies,
  type,
  filterMode = false,
}: {
  movies: Movie[];
  type: 'movies' | 'watchlist' | 'watched';
  filterMode?: boolean;
}) => {
  const watchList = useAppSelector(userWatchList);
  const watchedMovies = useAppSelector(userWatchedMovies);

  const cards = movies.map((movie) => (
    <MovieCard
      key={String(movie.id)}
      movie={movie}
      inWatchList={!!watchList?.find((item) => item.id === movie.id)}
      watched={!!watchedMovies?.find((item) => item.id === movie.id)}
    />
  ));

  let message = filterMode ? 'no results' : undefined;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 256px)',
        gridTemplateRows: 'auto',
        gap: 2,
        justifyContent: 'center',
      }}
    >
      {movies.length < 1 ? <EmptyMovieList message={message} /> : cards}
    </Box>
  );
};

export default MoviesGrid;
