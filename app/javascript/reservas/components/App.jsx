import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Place from './Place';

const App = (props) => (
  <Router>
	<div>
	  <Route
	    path='/'
	    component={Place}
	  />
	</div>
  </Router>
);

export default App;
