import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import axios from '../../libs/axios';
import urls from '../../shared/urls';

export const fetchSolutions = createAsyncThunk('solution/fetch', async (payload, { dispatch }) => {
    try {
        dispatch(actions.solutionsFetchStart());

        const response = await axios.get(urls.solution);

        dispatch(actions.solutionsFetchSuccess({ solutions: response.data }));
    } catch (error) {
        dispatch(actions.solutionsFetchFail({ error: error?.response?.message || error.message }));
    }
});

export const removeSolution = createAsyncThunk('solution/remove', async (payload, { dispatch }) => {
    try {
        dispatch(actions.solutionRemoveStart());
        await axios.delete(`${urls.solution}/${payload.solutionId}`);

        await fetchSolutions();

        dispatch(actions.solutionRemoveSuccess());
    } catch (error) {
        dispatch(actions.solutionRemoveFail({ error: error.response.message || error.message }));
    }
});

export const addSolution = createAsyncThunk('solution/add', async (payload, { dispatch }) => {
    try {
        dispatch(actions.solutionAddStart());

        await axios.put(`${urls.solution}`, { ...payload.solution });

        dispatch(actions.solutionAddSuccess());
    } catch (error) {
        dispatch(actions.solutionAddFail({ error: error.response.message || error.message }));
    }
});

export const updateSolution = createAsyncThunk('solution/update', async (payload, { dispatch }) => {
    try {
        dispatch(actions.solutionUpdateStart());

        await axios.post(`${urls.solution}/${payload.solutionId}`, { ...payload.solution });

        dispatch(actions.solutionUpdateSuccess());
    } catch (error) {
        dispatch(actions.solutionUpdateFail({ error: error.response.message || error.message }));
    }
});
