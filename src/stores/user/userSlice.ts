/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
    RequestStatus,
} from '../../shared/requestStatus/requestStatus';
import { fetchUserSettings, updateUserSettings } from './user';
import { UserSettingsModel } from './dto';

export interface UserState {
    fetchUserRequestStatus: RequestStatus;
    settingsUpdateRequest: RequestStatus;
    settings: UserSettingsModel | null;
}

const initialState: UserState = {
    fetchUserRequestStatus: createRequestStatus(),
    settingsUpdateRequest: createRequestStatus(),
    settings: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleFetchingUserSettings(builder);
        handleUpdatingSettings(builder);

        return builder;
    },
});

export default userSlice.reducer;

export const { actions, reducer } = userSlice;

function handleFetchingUserSettings(builder: ActionReducerMapBuilder<typeof initialState>) {
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

function handleUpdatingSettings(builder: ActionReducerMapBuilder<typeof initialState>) {
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
