/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
} from '../../shared/requestStatus/requestStatus';
import { fetchSolutions, removeSolution, updateSolution } from './solutions';

const handleSolutionsFetch = (builder) =>
    builder
        .addCase(fetchSolutions.pending, (state) => {
            state.fetchSolutionsRequest = requestLoading();
        })
        .addCase(fetchSolutions.fulfilled, (state, action) => {
            state.fetchSolutionsRequest = requestFinishedSuccessfully();
            state.solutions = action?.payload;
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

const initialState = {
    solutions: null,
    fetchSolutionsRequest: createRequestStatus(),
    solutionUpdateRequest: createRequestStatus(),
    removeSolutionRequest: createRequestStatus(),
};

const solutionsSlice = createSlice({
    name: 'solutions',
    initialState,
    extraReducers: (builder) => {
        handleSolutionsFetch(builder);
        handleSolutionsRemove(builder);
        handleSolutionsUpdate(builder);
    },
});

export const { actions, reducer } = solutionsSlice;

export default solutionsSlice.reducer;
