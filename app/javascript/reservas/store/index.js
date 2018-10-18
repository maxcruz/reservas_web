import {S} from "../constants";
import appReducers from './reducers'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware } from 'redux'
import initialState from '../initialState.json'

const consoleMessages = store => next => action => {
    console.groupCollapsed(`dispatching action => ${action.type}`);
    console.log('previous state', store.getState());
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
};

const saveState = store => next => action => {
    let result = next(action);
    localStorage[S.BOOKING_STORE] = JSON.stringify(store.getState());
    return result;
};

export default () => {
    let currentState = (localStorage[S.BOOKING_STORE]) ?
        JSON.parse(localStorage[S.BOOKING_STORE]) :
        initialState;
    return applyMiddleware(thunk, consoleMessages)(createStore, saveState)(appReducers, currentState);
}