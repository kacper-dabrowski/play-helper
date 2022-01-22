/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
} from '../../shared/requestStatus/requestStatus';
import { fetchUserSettings, updateUserSettings } from './user';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        fetchUserRequestStatus: createRequestStatus(),
        fetchSolutionsRequest: createRequestStatus(),
        removeSolutionRequest: createRequestStatus(),
        settingsUpdateRequest: createRequestStatus(),
        solutionUpdateRequest: createRequestStatus(),
        settings: null,
        solutions: [],
    },
    reducers: {
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
        solutionUpdateStart: (state) => {
            state.solutionUpdateRequest = requestLoading();
        },
        solutionUpdateSuccess: (state) => {
            state.solutionUpdateRequest = requestFinishedSuccessfully();
        },
        solutionUpdateFail: (state, action) => {
            state.solutionUpdateRequest = requestFinishedWithError(action.payload.error);
        },
    },
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
