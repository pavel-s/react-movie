import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Movies from './routes/Movies/Movies';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import './utils/theme';
import WatchList from './routes/WatchList/WatchList';
import Watched from './routes/Watched/Watched';

const theme = createMuiTheme({
  palette: { type: 'dark' },
  appBar: { height: 64 },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
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
    </Provider>
  );
}

export default App;
