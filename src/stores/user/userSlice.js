/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
} from '../../shared/requestStatus/requestStatus';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        fetchUserRequestStatus: createRequestStatus(),
        fetchSupportRequestsStatus: createRequestStatus(),
        settings: null,
        supportRequests: null,
    },
    reducers: {
        userFetchStart: (state) => {
            state.fetchUserRequestStatus = requestLoading();
        },
        userFetchSuccess: (state, action) => {
            state.fetchUserRequestStatus = requestFinishedSuccessfully();
            state.settings = action.payload.settings;
        },
        userFetchFail: (state, action) => {
            state.fetchUserRequestStatus = requestFinishedWithError(action.payload.error);
        },
        userSettingsUpdate: (state, action) => {
            state.settings = action.payload.settings;
        },
        supportRequestsFetchStart: (state) => {
            state.fetchSupportRequestsStatus = requestLoading();
        },
        supportRequestsFetchSuccess: (state, action) => {
            state.fetchSupportRequestsStatus = requestFinishedSuccessfully();
            state.supportRequests = action.payload.supportRequests;
        },
        supportRequestsFetchFail: (state, action) => {
            state.fetchSupportRequestsStatus = requestFinishedWithError(action.payload.error);
        },
    },
});

export const { actions, reducer } = userSlice;

export default userSlice.reducer;
