import {
  AppBar,
  Box,
  Button,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  appbar: {
    minHeight: theme.appBar.height,
  },
  toolbar: {
    width: '100%',
    maxWidth: 1440,
    margin: '0 auto',
  },
  spacer: {
    flexGrow: 1,
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
  active: {
    backgroundColor: theme.palette.secondary.dark,
  },
  drawer: {
    width: 240,
  },
}));

const MainAppbar = ({ Left }: { Left?: React.ComponentType }) => {
  const styles = useStyles();
  const { pathname } = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar className={styles.appbar}>
      <Toolbar className={styles.toolbar}>
        {Left ? <Left /> : null}
        <Box className={styles.spacer} />
        <Box className={styles.toolbarRight}>
          <Hidden mdDown>
            <Button
              component={Link}
              to='/'
              className={clsx(pathname === '/' && styles.active)}
            >
              Movies
            </Button>
            <Button
              component={Link}
              to='/watchlist'
              className={clsx(pathname === '/watchlist' && styles.active)}
            >
              WatchList
            </Button>
            <Button
              component={Link}
              to='/watched'
              className={clsx(pathname === '/watched' && styles.active)}
            >
              Watched
            </Button>
          </Hidden>
          <Hidden mdUp>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Box>
      </Toolbar>
      <Drawer
        variant='temporary'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className={styles.drawer}
        anchor='right'
      >
        <List>
          <ListItem>
            <Button
              component={Link}
              to='/'
              className={clsx(pathname === '/' && styles.active)}
            >
              Movies
            </Button>
          </ListItem>
          <ListItem>
            <Button
              component={Link}
              to='/watchlist'
              className={clsx(pathname === '/watchlist' && styles.active)}
            >
              WatchList
            </Button>
          </ListItem>
          <ListItem>
            <Button
              component={Link}
              to='/watched'
              className={clsx(pathname === '/watched' && styles.active)}
            >
              Watched
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default MainAppbar;
