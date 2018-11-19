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
        return fetch(URL + 'field/' + id)
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
    };

    export const clearField = () => (dispatch) => {
        return new Promise(resolve => {
            resolve(
                dispatch({
                    type: C.CLEAR_FIELD,
                    payload: {}
                })
            )
        });
    };

    export const fetchPromos = (id, token) => (dispatch) => {
        return fetch(URL + 'field/' + id + '/promos', {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
        })
            .then(response => response.json())
            .then(promos => {
                dispatch({
                    type: C.FETCH_PROMOS,
                    payload: promos
                })
            })
            .catch(error => {
                dispatch(addError(error.message));
            });
    };

    export const fetchEvents = (id, token) => (dispatch) => {
        return fetch(URL + 'field/' + id + '/events', {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
        })
            .then(response => response.json())
            .then(events => {
                dispatch({
                    type: C.FETCH_EVENTS,
                    payload: events
                })
            })
            .catch(error => {
                dispatch(addError(error.message))
            });
    };

    export const login = (email, password) => (dispatch) => {
        return fetch(URL + 'login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => {
                const result = response.status === 200;
                dispatch({
                    type: C.SESSION,
                    payload: result
                });
                if (result) {
                    return response.json()
                }
            })
            .then(user => {
                dispatch({
                    type: C.LOGIN,
                    payload: user
                });
                return (Object.keys(user).length !== 0)
            })
            .catch(error => {
                dispatch(addError(error.message));
                throw error
            });
    };

    export const logout = () => (dispatch) => {
        fetch(URL + 'logout')
            .then(() => {
                dispatch({
                    type: C.SESSION,
                    payload: false
                });
            })
            .then(() => {
                dispatch({
                    type: C.LOGIN,
                    payload: {}
                });
            })
            .then(() => {
                dispatch({
                    type: C.CLEAR_ALL_ERRORS,
                    payload: {}
                });
            })
            .catch(error => {
                dispatch(addError(error.message))
            });
        return dispatch
    };

    export const paymentToken = (token) => (dispatch) => {
        return fetch(URL + 'checkout/new_token', {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
        })
            .then(response => response.json())
            .catch(error => {
                dispatch(addError(error.message));
                throw error
            });
    };

    export const checkout = (nonce, field_id, start, end, token) => (dispatch) => {
        return fetch(URL + 'checkout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                nonce: nonce,
                field_id: field_id,
                start: start,
                end: end
            })
        })
            .then(response => response.json())
            .catch(error => {
                dispatch(addError(error.message));
                throw error
            });
    };

    export const addError = (message) => {
        return {
            type: C.ADD_ERROR,
            payload: message
        }
    };
