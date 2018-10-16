import {C, URL} from './constants'
import fetch from 'isomorphic-fetch'

export const fetchPlace = () => (dispatch) => {
    fetch(URL + 'place')
        .then(response => response.json())
        .then(place => {
            dispatch({
                type: C.FETCH_PLACE,
                payload: place
            })
        })
        .catch(error => {
            dispatch(addError(error.message))
        });
    return dispatch
};

export const addError = (message) => {
    return {
        type: C.ADD_ERROR,
        payload: message
    }
};