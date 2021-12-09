import { createSlice } from '@reduxjs/toolkit';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
} from '../../shared/requestStatus/requestStatus';
/* eslint-disable no-param-reassign */

export const solutions = createSlice({
    name: 'solutions',
    initialState: {
        solutions: null,
        fetchSolutionsRequest: createRequestStatus(),
        removeSolutionRequest: createRequestStatus(),
        updateSolutionRequest: createRequestStatus(),
        addSolutionRequest: createRequestStatus(),
    },
    reducers: {
        solutionsFetchStart: (state) => {
            state.fetchSolutionsRequest = requestLoading();
        },
        solutionsFetchSuccess: (state, action) => {
            console.log(action);
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
            state.updateSolutionRequest = requestLoading();
        },
        solutionUpdateSuccess: (state) => {
            state.updateSolutionRequest = requestFinishedSuccessfully();
        },
        solutionUpdateFail: (state, action) => {
            state.updateSolutionRequest = requestFinishedWithError(action.payload.error);
        },
        solutionAddStart: (state) => {
            state.updateSolutionRequest = requestLoading();
        },
        solutionAddSuccess: (state) => {
            state.updateSolutionRequest = requestFinishedSuccessfully();
        },
        solutionAddFail: (state, action) => {
            state.updateSolutionRequest = requestFinishedWithError(action.payload.error);
        },
    },
});

export const { actions, reducer } = solutions;
export default solutions.reducer;
