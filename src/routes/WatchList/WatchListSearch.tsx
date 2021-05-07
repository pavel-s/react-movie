import { useCallback } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import SearchInput from '../../components/SearchInput';
import { moviesSearchQuery } from '../../redux/selectors';
import { watchListSetFilterQuery } from '../../redux/watchListReducer';

const WatchListSearch = () => {
  const dispatch = useAppDispatch();
  const handleChange = useCallback(
    (query: string) => dispatch(watchListSetFilterQuery(query)),
    [dispatch]
  );
  const handleEmpty = useCallback(() => dispatch(watchListSetFilterQuery('')), [
    dispatch,
  ]);

  return (
    <SearchInput
      handleChange={handleChange}
      handleEmpty={handleEmpty}
      initQuerySelector={moviesSearchQuery}
      debounceTime={100}
    />
  );
};

export default WatchListSearch;
