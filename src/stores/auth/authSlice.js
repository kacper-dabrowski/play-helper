/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
    createRequestStatus,
} from '../../shared/requestStatus/requestStatus';

const initialState = {
    user: {
        token: null,
        userId: null,
        fullName: '',
    },
    loginRequest: createRequestStatus(),
    registrationRequest: createRequestStatus(),
    logoutTimeoutId: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loginRequest = requestLoading();
        },
        loginFail: (state, action) => {
            state.loginRequest = requestFinishedWithError(action.payload.error);
        },
        loginSuccess: (state, action) => {
            state.loginRequest = requestFinishedSuccessfully();
            state.user = {
                token: action.payload.token,
                fullName: action.payload.fullName,
                userId: action.payload.userId,
            };
        },
        registerStart: (state) => {
            state.registrationRequest = requestLoading();
        },

        registerFail: (state, action) => {
            state.registrationRequest = requestFinishedWithError(action.payload.error);
        },
        registerSuccess: (state) => {
            state.registrationRequest = requestFinishedSuccessfully();
        },
        setLogoutTimeoutId: (state, action) => {
            state.logoutTimeoutId = action.payload.logoutTimeoutId;
        },
        logout: (state) => {
            clearTimeout(state.logoutTimeoutId);
            state.user = { token: null, userId: null, fullName: '' };
        },
    },
});
export const { actions } = authSlice;

export default authSlice.reducer;
