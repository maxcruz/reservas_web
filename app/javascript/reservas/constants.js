export const C = {
    FETCH_PLACE: "FETCH_PLACE",
    FETCH_FIELD: "FETCH_FIELD",
    CLEAR_FIELD: "CLEAR_FIELD",

    FETCH_PROMOS: "FETCH_PROMOS",
    FETCH_EVENTS: "FETCH_EVENTS",

    SESSION: "SESSION",
    LOGIN: "LOGIN",

    ADD_ERROR: "ADD_ERROR",
    CLEAR_ERROR: "CLEAR_ERROR",
    CLEAR_ALL_ERRORS: "CLEAR_ALL_ERRORS"
};

export const S = {
    BOOKING_STORE: "redux-store"
};

var getUrl = window.location;
export const URL = getUrl .protocol + "//" + getUrl.host + "/api/"
