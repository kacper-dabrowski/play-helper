import { authActions } from './actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    fullName: '',
    logoutTimeoutId: null,
};

const authStart = (state) => {
    return {
        ...state,
        loading: true,
        error: null,
    };
};
const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        fullName: action.fullName,
        error: null,
        loading: false,
    };
};

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    };
};

const authLogout = (state) => {
    return {
        ...state,
        token: null,
        userId: null,
    };
};

const logoutTimeoutSet = (state, action) => {
    return {
        ...state,
        ...action.payload,
    };
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActions.AUTH_START:
            return authStart(state, action);
        case authActions.AUTH_SUCCESS:
            return authSuccess(state, action);
        case authActions.AUTH_FAIL:
            return authFail(state, action);
        case authActions.AUTH_LOGOUT:
            return authLogout(state, action);
        case authActions.LOGOUT_TIMEOUT_SET:
            return logoutTimeoutSet(state, action);
        default:
            return state;
    }
};

export default authReducer;
