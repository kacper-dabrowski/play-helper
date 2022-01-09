/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
} from '../../shared/requestStatus/requestStatus';
import { fetchSupportRequests, fetchUserSettings, updateUserSettings } from './user';

const handleSettingsFetch = (builder) =>
    builder
        .addCase(fetchUserSettings.pending, (state) => {
            state.fetchUserRequestStatus = requestLoading();
        })
        .addCase(fetchUserSettings.fulfilled, (state, action) => {
            state.fetchUserRequestStatus = requestFinishedSuccessfully();
            state.settings = action.payload;
        })
        .addCase(fetchUserSettings.rejected, (state, action) => {
            state.fetchUserRequestStatus = requestFinishedWithError(action.error.message);
        });

const handleSettingsUpdate = (builder) =>
    builder
        .addCase(updateUserSettings.pending, (state) => {
            state.settingsUpdateRequest = requestLoading();
        })
        .addCase(updateUserSettings.fulfilled, (state) => {
            state.settingsUpdateRequest = requestFinishedSuccessfully();
        })
        .addCase(updateUserSettings.rejected, (state, action) => {
            state.settingsUpdateRequest = requestFinishedWithError(action.error.message);
        });

const handleSupportRequestsFetch = (builder) =>
    builder
        .addCase(fetchSupportRequests.pending, (state) => {
            state.fetchSupportRequestsStatus = requestLoading();
        })
        .addCase(fetchSupportRequests.fulfilled, (state, action) => {
            state.fetchSupportRequestsStatus = requestFinishedSuccessfully();
            state.supportRequests = action.payload.supportRequests;
        })
        .addCase(fetchSupportRequests.rejected, (state, action) => {
            state.fetchSupportRequestsStatus = requestFinishedWithError(action.error.message);
        });

const userSlice = createSlice({
    name: 'user',
    initialState: {
        fetchUserRequestStatus: createRequestStatus(),
        fetchSupportRequestsStatus: createRequestStatus(),
        settingsUpdateRequest: createRequestStatus(),
        settings: null,
        supportRequests: null,
    },
    extraReducers: (builder) => {
        handleSettingsFetch(builder);
        handleSettingsUpdate(builder);
        handleSupportRequestsFetch(builder);
    },
});

export const { actions, reducer } = userSlice;

export default userSlice.reducer;
