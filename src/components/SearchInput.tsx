import { ChangeEvent, memo, useEffect, useMemo, useState } from 'react';
import { alpha, InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Search…'
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
          }}
          value={query}
        />
      </Search>
    );
  }
);

export default SearchInput;
