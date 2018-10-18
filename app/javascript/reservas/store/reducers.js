import {C} from '../constants'
import { combineReducers } from 'redux'

export const place = (state={}, action) =>
    (action.type === C.FETCH_PLACE) ? action.payload : state;

export const field = (state={}, action) => {
    switch(action.type) {
        case C.FETCH_FIELD:
            return action.payload;
        case C.FETCH_PROMOS:
            return Object.assign({}, state, { promos: action.payload });
        case C.FETCH_EVENTS:
            return Object.assign({}, state, { events: action.payload });
        default:
            return state
    }
};

export const session = (state=false, action) => {
    switch(action.type) {
        case C.LOGIN:
            return action.payload;
        default:
            return state
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
    place,
    field,
    errors,
    session
})