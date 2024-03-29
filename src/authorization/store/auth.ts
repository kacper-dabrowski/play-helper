import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios from '../../libs/axios';
import urls from '../../shared/urls';
import { actions } from './authSlice';
import { RegistrationDto, SessionDto } from './dto';
import { removeUserFromLocalStorage, saveUserInLocalStorage } from './localStorage/localStorage';

interface LoginPayload {
    username: string;
    password: string;
    onSuccess?: () => void;
}

export const loginUser = createAsyncThunk('auth/login', async ({ username, password, onSuccess }: LoginPayload) => {
    const response: AxiosResponse<SessionDto> = await axios.post(urls.login, { username, password });

    const { token, userId, fullName, expiresIn } = response.data;

    if (!token || !userId) {
        throw new Error('Unable to authenticate');
    }

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    saveUserInLocalStorage({ token, userId, fullName, expirationDate });

    if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
    }

    return { token, userId, fullName, expiresIn };
});

export const authCheckState = createAsyncThunk('auth/auth-check-state', async (payload, { dispatch }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return dispatch(actions.logout());
    }

    const userId = localStorage.getItem('userId');
    const fullName = localStorage.getItem('fullName');
    const savedExpirationDate = localStorage.getItem('expirationDate');

    if (!savedExpirationDate) {
        return dispatch(actions.logout());
    }

    const expirationDate = new Date(savedExpirationDate);

    const isTokenValid = expirationDate.getTime() >= new Date().getTime();

    if (isTokenValid) {
        dispatch(actions.userAlreadyLoggedIn({ token, userId, fullName }));
        const calculatedTimeLeft = (expirationDate.getTime() - new Date().getTime()) / 1000;

        return dispatch(checkTimeout(calculatedTimeLeft));
    }

    return dispatch(logout());
});

export const logout = createAsyncThunk('auth/logout', async (payload, { dispatch }) => {
    removeUserFromLocalStorage();

    dispatch(actions.logout());
});

interface RegistrationPayload {
    username: string;
    password: string;
    fullName: string;
    confirmPassword: string;
    onSuccess?: () => void;
}

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ username, password, fullName, confirmPassword, onSuccess }: RegistrationPayload, { dispatch }) => {
        const response: AxiosResponse<RegistrationDto> = await axios.post(urls.signup, {
            username,
            password,
            fullName,
            repeatPassword: confirmPassword,
        });

        if (!response.data.token) {
            return;
        }

        await dispatch(loginUser({ username, password }));

        if (typeof onSuccess === 'function') {
            onSuccess();
        }
    }
);

const checkTimeout = createAsyncThunk(
    'auth/session-inactive',
    async (expirationTime: number | string, { dispatch }) => {
        const logoutTimeoutId = setTimeout(() => {
            dispatch(actions.logout());
        }, +expirationTime * 1000);

        dispatch(actions.setLogoutTimeoutId(logoutTimeoutId));
    }
);
