import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Movies from './routes/Movies/Movies';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Movies />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
