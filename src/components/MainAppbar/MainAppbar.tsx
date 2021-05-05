import {
  AppBar,
  fade,
  InputBase,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { ChangeEvent } from 'react';
import { debounce } from 'lodash';

const debouncedHandler = debounce(
  (val) => {
    console.log(val);
  },
  500,
  { leading: true }
);

const useStyles = makeStyles((theme) => ({
  appbar: {
    minHeight: theme.appBar.height,
  },
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

const MainAppbar = () => {
  const styles = useStyles();
  return (
    <AppBar className={styles.appbar}>
      <Toolbar>
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
              debouncedHandler(e.target.value);
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppbar;
