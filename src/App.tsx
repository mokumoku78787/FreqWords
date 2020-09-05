import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Voc from './components/voc';
import About from './components/About';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/voc/german">
          <Voc name='German 10000' />
        </Route>
        <Route path="/voc/french">
          <Voc name='French 10000' />
        </Route>
        <Route path="/voc/spanish">
          <Voc name='Spanish 10000' />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
