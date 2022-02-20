/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
    RequestStatus,
} from '../../shared/requestStatus/requestStatus';
import { Maybe } from '../../shared/types';
import { loginUser, registerUser } from './auth';

interface AuthState {
    user: {
        token: Maybe<string>;
        userId: Maybe<string>;
        fullName: string;
    };
    loginRequest: RequestStatus;
    registrationRequest: RequestStatus;
    logoutTimeoutId: Maybe<ReturnType<typeof setTimeout>>;
}

const initialState: AuthState = {
    user: {
        token: '',
        userId: '',
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
        setLogoutTimeoutId: (state, action) => {
            state.logoutTimeoutId = action.payload.logoutTimeoutId;
        },
        logout: (state) => {
            if (state.logoutTimeoutId) {
                clearTimeout(state.logoutTimeoutId);
            }

            state.user = { token: '', userId: '', fullName: '' };
            state.loginRequest = createRequestStatus();
            state.registrationRequest = createRequestStatus();
        },
        userAlreadyLoggedIn: (state, action) => {
            state.user = {
                token: action.payload?.token,
                fullName: action.payload.fullName,
                userId: action.payload.userId,
            };
        },
    },
    extraReducers: (builder) => {
        handleLogin(builder);
        handleRegistration(builder);
    },
});

function handleRegistration(builder: ActionReducerMapBuilder<typeof initialState>) {
    builder
        .addCase(registerUser.pending, (state) => {
            state.registrationRequest = requestLoading();
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.registrationRequest = requestFinishedSuccessfully();
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.registrationRequest = requestFinishedWithError(action.error.message);
        });
}

function handleLogin(builder: ActionReducerMapBuilder<typeof initialState>) {
    builder
        .addCase(loginUser.pending, (state) => {
            state.loginRequest = requestLoading();
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loginRequest = requestFinishedSuccessfully();
            state.user = {
                token: action.payload?.token,
                fullName: action.payload.fullName,
                userId: action.payload.userId,
            };
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loginRequest = requestFinishedWithError(action.error.message);
        });
}

export const { actions } = authSlice;

export default authSlice.reducer;
