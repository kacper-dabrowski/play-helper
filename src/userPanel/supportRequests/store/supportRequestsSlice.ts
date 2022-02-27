/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
    RequestStatus,
} from '../../../shared/requestStatus/requestStatus';
import { SupportRequestModel } from './dto';
import {
    createSupportRequest,
    fetchSupportRequests,
    removeSupportRequest,
    updateSupportRequest,
} from './supportRequests';

interface SupportRequestState {
    supportRequests: SupportRequestModel[] | null;
    fetchSupportRequestsStatus: RequestStatus;
    addSupportRequestsStatus: RequestStatus;
    removeSupportRequestStatus: RequestStatus;
    updateSupportRequestStatus: RequestStatus;
}

const initialState: SupportRequestState = {
    supportRequests: null,
    fetchSupportRequestsStatus: createRequestStatus(),
    addSupportRequestsStatus: createRequestStatus(),
    removeSupportRequestStatus: createRequestStatus(),
    updateSupportRequestStatus: createRequestStatus(),
};

const supportRequestsSlice = createSlice({
    name: 'support-requests',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleFetchingSupportRequests(builder);
        handleCreatingSupportRequest(builder);
        handleUpdatingSupportRequest(builder);
        handleRemovingSupportRequest(builder);
    },
});

export const { actions, reducer } = supportRequestsSlice;
export default supportRequestsSlice.reducer;

function handleFetchingSupportRequests(builder: ActionReducerMapBuilder<SupportRequestState>) {
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

function handleCreatingSupportRequest(builder: ActionReducerMapBuilder<SupportRequestState>) {
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

function handleUpdatingSupportRequest(builder: ActionReducerMapBuilder<SupportRequestState>) {
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

function handleRemovingSupportRequest(builder: ActionReducerMapBuilder<SupportRequestState>) {
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
