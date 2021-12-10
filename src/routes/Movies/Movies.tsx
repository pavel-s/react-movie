import RouteContainer from '../../components/RouteContainer';
import MainAppbar from '../../components/MainAppbar/MainAppbar';
import MoviesGrid from '../../components/MoviesGrid/MoviesGrid';
import { useAppSelector } from '../../redux/hooks';
import { moviesTrending } from '../../redux/selectors';
import MoviesSearch from './MoviesSearch';

const Movies = () => {
  const movies = useAppSelector(moviesTrending);

  return (
    <RouteContainer>
      <MainAppbar Left={MoviesSearch} />
      <MoviesGrid movies={movies} type='movies' />
    </RouteContainer>
  );
};

export default Movies;
