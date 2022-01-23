/* eslint-disable no-param-reassign */
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    requestLoading,
    RequestStatus,
} from '../../shared/requestStatus/requestStatus';
import { SolutionDto } from './dto';
import { createSolution, fetchSolutions, removeSolution, updateSolution } from './solutions';

interface SolutionState {
    solutions: SolutionDto[] | null;
    fetchSolutionsStatus: RequestStatus;
    addSolutionStatus: RequestStatus;
    removeSolutionStatus: RequestStatus;
    updateSolutionStatus: RequestStatus;
}
const initialState: SolutionState = {
    solutions: null,
    fetchSolutionsStatus: createRequestStatus(),
    addSolutionStatus: createRequestStatus(),
    removeSolutionStatus: createRequestStatus(),
    updateSolutionStatus: createRequestStatus(),
};

const supportRequestsSlice = createSlice({
    name: 'support-requests',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleFetchingSolutions(builder);
        handleCreatingSolutions(builder);
        handleUpdatingSolutions(builder);
        handleRemovingSolutions(builder);
    },
});

export const { actions, reducer } = supportRequestsSlice;
export default supportRequestsSlice.reducer;

function handleFetchingSolutions(builder: ActionReducerMapBuilder<SolutionState>) {
    return builder
        .addCase(fetchSolutions.pending, (state) => {
            state.fetchSolutionsStatus = requestLoading();
        })
        .addCase(fetchSolutions.fulfilled, (state, action) => {
            state.solutions = action.payload;
            state.fetchSolutionsStatus = requestFinishedSuccessfully();
        })
        .addCase(fetchSolutions.rejected, (state, action) => {
            state.fetchSolutionsStatus = requestFinishedWithError(action.error.message);
        });
}

function handleCreatingSolutions(builder: ActionReducerMapBuilder<SolutionState>) {
    builder
        .addCase(createSolution.pending, (state) => {
            state.addSolutionStatus = requestLoading();
        })
        .addCase(createSolution.fulfilled, (state) => {
            state.addSolutionStatus = requestFinishedSuccessfully();
        })
        .addCase(createSolution.rejected, (state, action) => {
            state.addSolutionStatus = requestFinishedWithError(action.error.message);
        });
}

function handleUpdatingSolutions(builder: ActionReducerMapBuilder<SolutionState>) {
    builder
        .addCase(updateSolution.pending, (state) => {
            state.updateSolutionStatus = requestLoading();
        })
        .addCase(updateSolution.fulfilled, (state) => {
            state.updateSolutionStatus = requestFinishedSuccessfully();
        })
        .addCase(updateSolution.rejected, (state, action) => {
            state.updateSolutionStatus = requestFinishedWithError(action.error.message);
        });
}

function handleRemovingSolutions(builder: ActionReducerMapBuilder<SolutionState>) {
    builder
        .addCase(removeSolution.pending, (state) => {
            state.removeSolutionStatus = requestLoading();
        })
        .addCase(removeSolution.fulfilled, (state) => {
            state.removeSolutionStatus = requestFinishedSuccessfully();
        })
        .addCase(removeSolution.rejected, (state, action) => {
            state.removeSolutionStatus = requestFinishedWithError(action.error.message);
        });
}
