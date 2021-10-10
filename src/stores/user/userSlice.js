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
        fetchSolutionsRequest: createRequestStatus(),
        removeSolutionRequest: createRequestStatus(),
        settingsUpdateRequest: createRequestStatus(),
        settings: null,
        supportRequests: null,
        solutions: [],
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
        settingsUpdateStart: (state) => {
            state.settingsUpdateRequest = requestLoading();
        },
        settingsUpdateFail: (state, action) => {
            state.settingsUpdateRequest = requestFinishedWithError(action.payload.error);
        },
        settingsUpdateSuccess: (state, action) => {
            state.settingsUpdateRequest = requestFinishedSuccessfully();
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
        solutionsFetchStart: (state) => {
            state.fetchSolutionsRequest = requestLoading();
        },
        solutionsFetchSuccess: (state, action) => {
            state.fetchSolutionsRequest = requestFinishedSuccessfully();
            state.solutions = action.payload.solutions;
        },
        solutionsFetchFail: (state, action) => {
            state.fetchSolutionsRequest = requestFinishedWithError(action.payload.error);
        },
        solutionRemoveStart: (state) => {
            state.removeSolutionRequest = requestLoading();
        },
        solutionRemoveSuccess: (state) => {
            state.removeSolutionRequest = requestFinishedSuccessfully();
        },
        solutionRemoveFail: (state, action) => {
            state.removeSolutionRequest = requestFinishedWithError(action.payload.error);
        },
    },
});

export const { actions, reducer } = userSlice;

export default userSlice.reducer;
