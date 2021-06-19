import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    settings: null,
    loading: false,
    error: null,
};

const userFetchStart = (state) => {
    return { ...state, loading: true };
};

const userFetchSuccess = (state, action) => {
    return { ...state, settings: action.payload.settings, loading: false };
};

const userFetchFailed = (state, action) => {
    return { ...state, settings: null, error: action.payload.error, loading: false };
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_FETCH_START:
            return userFetchStart(state, action);
        case actionTypes.USER_FETCH_SUCCESS:
            return userFetchSuccess(state, action);
        case actionTypes.USER_FETCH_FAIL:
            return userFetchFailed(state, action);
        default:
            return state;
    }
};
