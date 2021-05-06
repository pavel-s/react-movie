import { fade, InputBase, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { moviesSearchQuery } from '../../redux/selectors';
import { getTrending, searchMovies } from '../../redux/moviesReducer';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const MoviesSearch = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const initQuery = useAppSelector(moviesSearchQuery);
  const [query, setQuery] = useState(initQuery);

  const searchMoviesDebounced = useMemo(() => {
    return debounce(
      (query: string) => dispatch(searchMovies({ query })),
      2000,
      {
        leading: true,
      }
    );
  }, [dispatch]);

  useEffect(() => {
    if (query === '') {
      dispatch(getTrending());
    } else {
      searchMoviesDebounced(query);
    }
  }, [query, dispatch, searchMoviesDebounced]);

  return (
    <div className={styles.search}>
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder='Search…'
        classes={{
          root: styles.inputRoot,
          input: styles.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
        }}
        value={query}
      />
    </div>
  );
};

export default MoviesSearch;
