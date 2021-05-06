import { AppBar, Box, Button, makeStyles, Toolbar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appbar: {
    minHeight: theme.appBar.height,
  },
  toolbarRight: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    '& > *': {
      marginRight: 20,
    },
  },
}));

const MainAppbar = ({ Left }: { Left?: React.ComponentType }) => {
  const styles = useStyles();
  return (
    <AppBar className={styles.appbar}>
      <Toolbar>
        {Left ? <Left /> : null}
        <Box className={styles.toolbarRight}>
          <Button component={Link} to='/'>
            Movies
          </Button>
          <Button component={Link} to='/watchlist'>
            WatchList
          </Button>
          <Button component={Link} to='/watched'>
            Watched
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppbar;
