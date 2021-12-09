import { createSlice } from '@reduxjs/toolkit';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
} from '../../shared/requestStatus/requestStatus';

/* eslint-disable no-param-reassign */
export const supportRequests = createSlice({
    name: 'supportRequests',
    initialState: {
        fetchSupportRequestsRequest: createRequestStatus(),
        removeSupportRequestRequest: createRequestStatus(),
        updateSupportRequestRequest: createRequestStatus(),
        addSupportRequestRequest: createRequestStatus(),
        supportRequests: null,
    },
    reducers: {
        fetchSupportRequestsStart: (state) => {
            state.fetchSupportRequestsStatus = requestLoading();
        },
        fetchSupportRequestsFail: (state, action) => {
            state.fetchSupportRequestsStatus = requestFinishedWithError(action.payload.error);
        },
        fetchSupportRequestsSuccess: (state, action) => {
            state.fetchSupportRequestsStatus = requestFinishedSuccessfully();
            state.supportRequests = action.payload.supportRequests;
        },
        removeSupportRequestStart: (state) => {
            state.removeSupportRequestRequest = requestLoading();
        },
        removeSupportRequestFail: (state, action) => {
            state.removeSupportRequestRequest = requestFinishedWithError(action.payload.error);
        },
        removeSupportRequestSuccess: (state) => {
            state.removeSupportRequestRequest = requestFinishedSuccessfully();
        },
        updateSupportRequestStart: (state) => {
            state.updateSupportRequestRequest = requestLoading();
        },
        updateSupportRequestFail: (state, action) => {
            state.updateSupportRequestRequest = requestFinishedWithError(action.payload.error);
        },
        updateSupportRequestSuccess: (state) => {
            state.updateSupportRequestRequest = requestFinishedSuccessfully();
        },
        addSupportRequestStart: (state) => {
            state.addSupportRequestRequest = requestLoading();
        },
        addSupportRequestFail: (state, action) => {
            state.addSupportRequestRequest = requestFinishedWithError(action.payload.error);
        },
        addSupportRequestSuccess: (state) => {
            state.addSupportRequestRequest = requestFinishedSuccessfully();
        },
    },
});

export const { actions, reducer } = supportRequests;
export default supportRequests.reducer;
