import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../libs/axios';
import urls from '../../shared/urls';
import { actions } from './authSlice';

const checkTimeout = createAsyncThunk('auth/session-inactive', async ({ expirationTime }, { dispatch }) => {
    const logoutTimeoutId = setTimeout(() => {
        dispatch(actions.logout());
    }, +expirationTime * 1000);

    dispatch(actions.setLogoutTimeoutId(logoutTimeoutId));
});

export const loginUser = createAsyncThunk('auth/login', async ({ username, password, onSuccess }, { dispatch }) => {
    try {
        dispatch(actions.loginStart());
        const response = await axios.post(urls.login, { username, password });

        const { token: idToken, userId, fullName, expiresIn } = response.data;

        if (!idToken || !userId) {
            throw new Error('Unable to authenticate');
        }

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

        localStorage.setItem('token', idToken);
        localStorage.setItem('expirationDate', expirationDate.toString());
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('userId', userId);

        if (onSuccess && typeof onSuccess === 'function') {
            onSuccess();
        }

        dispatch(checkTimeout({ expirationTime: expiresIn }));

        dispatch(actions.loginSuccess(response.data));
    } catch (error) {
        dispatch(actions.loginFail({ error: error?.response?.data?.message || error.message }));
    }
});

export const authCheckState = createAsyncThunk('auth/auth-check-state', async (payload, { dispatch }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return dispatch(actions.logout());
    }
    const userId = localStorage.getItem('userId');
    const fullName = localStorage.getItem('fullName');

    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    const isTokenValid = expirationDate.getTime() >= new Date().getTime();

    if (isTokenValid) {
        dispatch(actions.loginSuccess({ token, userId, fullName }));
        const calculatedTimeLeft = (expirationDate.getTime() - new Date().getTime()) / 1000;

        return dispatch(checkTimeout({ expirationTime: calculatedTimeLeft }));
    }

    return dispatch(actions.logout());
});

export const logout = createAsyncThunk('auth/logout', async (payload, { dispatch }) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userId');
    dispatch(actions.logout());
});

export const registerUser = createAsyncThunk('auth/register', async (payload, { dispatch }) => {
    try {
        const { username, password, fullName } = payload;

        dispatch(actions.registerStart());

        const response = await axios.post(urls.signup, { username, password, fullName });

        dispatch(actions.registerSuccess(response.data));
        dispatch(loginUser({ username, password }));

        if (typeof payload?.onSuccess === 'function') {
            payload.onSuccess();
        }
    } catch (error) {
        dispatch(actions.registerFail({ error: error?.response?.data?.message || error.message }));
    }
});
