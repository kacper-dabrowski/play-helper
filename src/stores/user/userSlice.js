/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
} from '../../shared/requestStatus/requestStatus';
import { fetchUserSettings, updateUserSettings } from './user';

const initialState = {
    fetchUserRequestStatus: createRequestStatus(),
    settingsUpdateRequest: createRequestStatus(),
    settings: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        handleFetchingUserSettings(builder);
        handleUpdatingSettings(builder);

        return builder;
    },
});

export default userSlice.reducer;

export const { actions, reducer } = userSlice;

function handleFetchingUserSettings(builder) {
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
}

function handleUpdatingSettings(builder) {
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
}
