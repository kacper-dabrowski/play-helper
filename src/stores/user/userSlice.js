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
        settingsUpdateRequest: createRequestStatus(),
        settings: null,
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
    },
});

export const { actions, reducer } = userSlice;

export default userSlice.reducer;
