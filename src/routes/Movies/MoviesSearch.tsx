import { useCallback } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { getTrending, searchMovies } from '../../redux/moviesReducer';
import SearchInput from '../../components/SearchInput';
import { moviesSearchQuery } from '../../redux/selectors';

const MoviesSearch = () => {
  const dispatch = useAppDispatch();
  const handleChange = useCallback(
    (query: string) => dispatch(searchMovies({ query })),
    [dispatch]
  );
  const handleEmpty = useCallback(() => dispatch(getTrending()), [dispatch]);

  return (
    <SearchInput
      handleChange={handleChange}
      handleEmpty={handleEmpty}
      initQuerySelector={moviesSearchQuery}
    />
  );
};

export default MoviesSearch;
