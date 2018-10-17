import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux'
import storeFactory from './store'
import {fetchPlace} from './actions'

const store = storeFactory();
store.dispatch(fetchPlace());

const container = document.querySelector('#reservas');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    container);
