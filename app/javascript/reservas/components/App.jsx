import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Place from './container/Place';
import SignIn from './SignIn';
import Field from './container/Field';

const App = () => (
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