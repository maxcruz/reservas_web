import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import storeFactory from './store'
import {fetchPlace} from './actions'

const store = storeFactory();
store.dispatch(fetchPlace());

const reservas = document.querySelector('#reservas');
ReactDOM.render(<App />, reservas);
