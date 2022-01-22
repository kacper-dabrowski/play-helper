/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
} from '../../shared/requestStatus/requestStatus';
import {
    createSupportRequest,
    fetchSupportRequests,
    removeSupportRequest,
    updateSupportRequest,
} from './supportRequests';

const initialState = {
    supportRequests: null,
    fetchSupportRequestsStatus: createRequestStatus(),
    addSupportRequestsStatus: createRequestStatus(),
    removeSupportRequestStatus: createRequestStatus(),
    updateSupportRequestStatus: createRequestStatus(),
};

const supportRequestsSlice = createSlice({
    name: 'support-requests',
    initialState,
    extraReducers: (builder) => {
        handleFetchingSupportRequests(builder);
        handleCreatingSupportRequest(builder);
        handleUpdatingSupportRequest(builder);
        handleRemovingSupportRequest(builder);
    },
});

export const { actions, reducer } = supportRequestsSlice;
export default supportRequestsSlice.reducer;

function handleFetchingSupportRequests(builder) {
    return builder
        .addCase(fetchSupportRequests.pending, (state) => {
            state.fetchSupportRequestsStatus = requestLoading();
        })
        .addCase(fetchSupportRequests.fulfilled, (state, action) => {
            state.supportRequests = action.payload;
            state.fetchSupportRequestsStatus = requestFinishedSuccessfully();
        })
        .addCase(fetchSupportRequests.rejected, (state, action) => {
            state.fetchSupportRequestsStatus = requestFinishedWithError(action.error.message);
        });
}

function handleCreatingSupportRequest(builder) {
    builder
        .addCase(createSupportRequest.pending, (state) => {
            state.addSupportRequestsStatus = requestLoading();
        })
        .addCase(createSupportRequest.fulfilled, (state) => {
            state.addSupportRequestsStatus = requestFinishedSuccessfully();
        })
        .addCase(createSupportRequest.rejected, (state, action) => {
            state.addSupportRequestsStatus = requestFinishedWithError(action.error.message);
        });
}

function handleUpdatingSupportRequest(builder) {
    builder
        .addCase(updateSupportRequest.pending, (state) => {
            state.updateSupportRequestStatus = requestLoading();
        })
        .addCase(updateSupportRequest.fulfilled, (state) => {
            state.updateSupportRequestStatus = requestFinishedSuccessfully();
        })
        .addCase(updateSupportRequest.rejected, (state, action) => {
            state.updateSupportRequestStatus = requestFinishedWithError(action.error.message);
        });
}

function handleRemovingSupportRequest(builder) {
    builder
        .addCase(removeSupportRequest.pending, (state) => {
            state.removeSupportRequestStatus = requestLoading();
        })
        .addCase(removeSupportRequest.fulfilled, (state) => {
            state.removeSupportRequestStatus = requestFinishedSuccessfully();
        })
        .addCase(removeSupportRequest.rejected, (state, action) => {
            state.removeSupportRequestStatus = requestFinishedWithError(action.error.message);
        });
}
