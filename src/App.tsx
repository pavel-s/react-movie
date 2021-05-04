import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Movies from './routes/Movies/Movies';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Movies />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
