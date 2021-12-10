import { useCallback } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import SearchInput from '../../components/SearchInput';
import { moviesSearchQuery } from '../../redux/selectors';
import { watchedSetFilterQuery } from '../../redux/watchedReducer';

const WatchedSearch = () => {
  const dispatch = useAppDispatch();
  const handleChange = useCallback(
    (query: string) => dispatch(watchedSetFilterQuery(query)),
    [dispatch]
  );
  const handleEmpty = useCallback(
    () => dispatch(watchedSetFilterQuery('')),
    [dispatch]
  );

  return (
    <SearchInput
      handleChange={handleChange}
      handleEmpty={handleEmpty}
      initQuerySelector={moviesSearchQuery}
      debounceTime={100}
    />
  );
};

export default WatchedSearch;
