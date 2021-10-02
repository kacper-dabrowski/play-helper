/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    fullName: '',
    logoutTimeoutId: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.token = action.payload.token;
            state.fullName = action.payload.fullName;
            state.userId = action.payload.userId;
        },
        setLogoutTimeoutId: (state, action) => {
            state.logoutTimeoutId = action.payload.logoutTimeoutId;
        },
        logout: (state) => {
            clearTimeout(state.logoutTimeoutId);
            state.token = null;
        },
    },
});
export const { actions } = authSlice;

export default authSlice.reducer;
