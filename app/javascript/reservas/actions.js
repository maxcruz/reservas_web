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

export const fetchField = (id) => (dispatch) => {
    fetch(URL + 'field/' + id)
        .then(response => response.json())
        .then(field => {
            dispatch({
                type: C.FETCH_FIELD,
                payload: field
            });
        })
        .catch(error => {
            dispatch(addError(error.message))
        });
    return dispatch
};

export const clearField = () => {
    return {
        type: C.FETCH_FIELD,
        payload: {}
    }
};

export const fetchPromos = (id) => (dispatch) => {
    fetch(URL + 'field/' + id + '/promos')
        .then(response => response.json())
        .then(promos => {
            dispatch({
                type: C.FETCH_PROMOS,
                payload: promos
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