/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
    fetchSolutions,
    fetchSupportRequests,
    fetchUserSettings,
    removeSolution,
    updateSolution,
    updateUserSettings,
} from './user';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
} from '../../shared/requestStatus/requestStatus';

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

const handleSolutionsFetch = (builder) =>
    builder
        .addCase(fetchSolutions.pending, (state) => {
            state.fetchSolutionsRequest = requestLoading();
        })
        .addCase(fetchSolutions.fulfilled, (state, action) => {
            state.fetchSolutionsRequest = requestFinishedSuccessfully();
            state.solutions = action?.payload?.solutions;
        })
        .addCase(fetchSolutions.rejected, (state, action) => {
            state.fetchSolutionsRequest = requestFinishedWithError(action.error.message);
        });

const handleSolutionsRemove = (builder) =>
    builder
        .addCase(removeSolution.pending, (state) => {
            state.removeSolutionRequest = requestLoading();
        })
        .addCase(removeSolution.fulfilled, (state) => {
            state.removeSolutionRequest = requestFinishedSuccessfully();
        })
        .addCase(removeSolution.rejected, (state, action) => {
            state.removeSolutionRequest = requestFinishedWithError(action.error.message);
        });

const handleSolutionsUpdate = (builder) =>
    builder
        .addCase(updateSolution.pending, (state) => {
            state.solutionUpdateRequest = requestLoading();
        })
        .addCase(updateSolution.fulfilled, (state) => {
            state.solutionUpdateRequest = requestFinishedSuccessfully();
        })
        .addCase(updateSolution.rejected, (state, action) => {
            state.solutionUpdateRequest = requestFinishedWithError(action.error.message);
        });

const userSlice = createSlice({
    name: 'user',
    initialState: {
        fetchUserRequestStatus: createRequestStatus(),
        fetchSupportRequestsStatus: createRequestStatus(),
        fetchSolutionsRequest: createRequestStatus(),
        removeSolutionRequest: createRequestStatus(),
        settingsUpdateRequest: createRequestStatus(),
        solutionUpdateRequest: createRequestStatus(),
        settings: null,
        supportRequests: null,
        solutions: null,
    },
    extraReducers: (builder) => {
        handleSettingsFetch(builder);
        handleSettingsUpdate(builder);
        handleSupportRequestsFetch(builder);
        handleSolutionsFetch(builder);
        handleSolutionsRemove(builder);
        handleSolutionsUpdate(builder);
    },
});

export const { actions, reducer } = userSlice;

export default userSlice.reducer;
