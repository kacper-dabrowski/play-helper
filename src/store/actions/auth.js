import axios from '../../axios';
import urls from '../../shared/urls';
import * as actionTypes from './actionsTypes';

const authStart = () => {
    return { type: actionTypes.AUTH_START };
};

const authSuccess = (token, userId, fullName) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId,
        fullName,
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('fullName');

    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const logoutTimeoutSet = (logoutTimeoutId) => ({
    type: actionTypes.LOGOUT_TIMEOUT_SET,
    payload: {
        logoutTimeoutId,
    },
});

const checkTimeout = (expirationTime) => {
    return (dispatch) => {
        const logoutTimeoutId = setTimeout(() => {
            dispatch(logout());
        }, +expirationTime * 1000);
        dispatch(logoutTimeoutSet(logoutTimeoutId));
    };
};

export const auth = (login, password, onSuccess) => {
    return async (dispatch) => {
        dispatch(authStart());
        try {
            const authData = { username: login, password };
            const response = await axios.post(urls.login, authData);
            const { token: idToken, userId, fullName, expiresIn } = response.data;
            if (!idToken || !userId) {
                throw new Error('Unable to authenticate');
            }
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            localStorage.setItem('token', idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('fullName', fullName);
            localStorage.setItem('userId', userId);
            dispatch(authSuccess(idToken, userId, fullName));
            dispatch(checkTimeout(expiresIn));

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            dispatch(authFail(error.response.status || error.message));
        }
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('State: Logged out due to no token!');
            return dispatch(logout());
        }
        const userId = localStorage.getItem('userId');
        const fullName = localStorage.getItem('fullName');

        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const isTokenValid = expirationDate.getTime() >= new Date().getTime();
        if (isTokenValid) {
            console.log('State: Logged in');
            dispatch(authSuccess(token, userId, fullName));
            return dispatch(checkTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
        console.log('State: Auth failed, because token is no longer valid');
        return dispatch(logout());
    };
};
