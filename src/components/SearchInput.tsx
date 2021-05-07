import { fade, InputBase, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ChangeEvent, memo, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

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

const SearchInput = memo(
  ({
    handleChange,
    handleEmpty,
    debounceTime = 500,
    initQuerySelector = () => '',
  }: {
    handleChange: any;
    handleEmpty: () => any;
    debounceTime?: number;
    initQuerySelector: (state: RootState) => string;
  }) => {
    const styles = useStyles();
    const initQuery = useAppSelector(initQuerySelector);
    const [query, setQuery] = useState(initQuery);

    const handleChangeDebounced = useMemo(() => {
      return debounce(handleChange, debounceTime, {
        leading: true,
      });
    }, [handleChange, debounceTime]);

    useEffect(() => {
      if (query === '') {
        handleEmpty();
      } else {
        handleChangeDebounced(query);
      }
    }, [query, handleEmpty, handleChangeDebounced]);

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
  }
);

export default SearchInput;
