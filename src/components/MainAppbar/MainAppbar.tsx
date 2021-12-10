import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  Toolbar,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const routes = [
  { to: '/', name: 'Movies' },
  { to: '/watchlist', name: 'WatchList' },
  { to: '/watched', name: 'Watched' },
];

const MainAppbar = ({ Left }: { Left?: React.ComponentType }) => {
  const { pathname } = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const Spacer = <Box sx={{ flexGrow: 1 }} />;

  const navButtons = routes.map((route) => (
    <ListItem key={route.name}>
      <Button
        component={Link}
        to={route.to}
        sx={{
          color: pathname === route.to ? 'primary.dark' : 'primary.light',
        }}
      >
        {route.name}
      </Button>
    </ListItem>
  ));

  return (
    <AppBar>
      <Toolbar sx={{ width: '100%', maxWidth: 'xl', m: '0 auto' }}>
        {Left ? <Left /> : null}
        <Hidden mdDown>
          <List disablePadding sx={{ display: 'flex' }}>
            {navButtons}
          </List>
        </Hidden>
        {Spacer}
        <Hidden mdUp>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            size='large'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Drawer
        variant='temporary'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor='right'
      >
        <List>{navButtons}</List>
      </Drawer>
    </AppBar>
  );
};

export default MainAppbar;
