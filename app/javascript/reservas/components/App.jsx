import React from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Place from './Place';
import SignIn from './SignIn';

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
	</div>
  </Router>
);

export default App;
