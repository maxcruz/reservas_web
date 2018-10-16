import {C} from '../constants'
import { combineReducers } from 'redux'

export const authentication = (state=null, action) => {
    switch (action.type) {
        case C.LOGIN:
            return (! hasSession) ? action.payload : state;
        case C.LOGOUT:
            return (hasSession) ? {} : state;
        default:
            return state
    }
};

export const place = (state=null, action) =>
    (action.type === C.FETCH_PLACE) ? action.payload : state;

export const field = (state=null, action) => {
    if (action.type === C.LOAD_FIELD && field !== undefined && field.id !== undefined) {
        return action.payload
    } else {
        return state
    }
};

export const calendar = (state = [], action) => {
    let {field} = state;
    if (field === undefined || field.id === undefined) {
        return state
    }
    switch (action.type) {
        case C.FETCH_RESERVATIONS:
            return (field.id !== undefined) ? action.payload : state;
        case C.FETCH_PROMOS:
            return (field.id !== undefined) ? action.payload : state;
        default:
            return state;
    }
};

export const errors = (state=[], action) => {
    switch(action.type) {
        case C.ADD_ERROR :
            return [
                ...state,
                action.payload
            ];
        case C.CLEAR_ERROR :
            return state.filter((message, i) => i !== action.payload);
        default:
            return state
    }
};

export default combineReducers({
    authentication,
    place,
    field,
    calendar,
    errors
})