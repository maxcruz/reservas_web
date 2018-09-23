import React from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Place from './Place';
import SignIn from './SignIn';
import Field from './Field';

const App = (props) => (
  <Router>
    <div>
      <Route
        exact
        path='/'
        component={Place}
        />
      <Route
        exact
        path='/login'
        component={SignIn}
        />
      <Route
        exact
        path='/field'
        component={Field}
        />
    </div>
  </Router>
);

export default App;
