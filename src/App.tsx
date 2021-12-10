import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Movies from './routes/Movies/Movies';
import WatchList from './routes/WatchList/WatchList';
import Watched from './routes/Watched/Watched';

const theme = createTheme({
  palette: { mode: 'dark' },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router>
            <CssBaseline />
            <Switch>
              <Route exact path='/'>
                <Movies />
              </Route>
              <Route path='/watchlist'>
                <WatchList />
              </Route>
              <Route path='/watched'>
                <Watched />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
