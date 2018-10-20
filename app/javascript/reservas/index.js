import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux'
import storeFactory from './store'

const store = storeFactory();

const container = document.querySelector('#reservas');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    container);
