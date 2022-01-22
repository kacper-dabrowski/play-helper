import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../libs/axios';
import urls from '../../shared/urls';

const name = 'solutions';
const Action = {
    Fetch: 'fetch',
    Create: 'create',
    Remove: 'remove',
    Update: 'update',
};

export const fetchSolutions = createAsyncThunk(`${name}/${Action.Fetch}`, async () => {
    const response = await axios.get(urls.solution);

    return response?.data;
});

export const createSolution = createAsyncThunk(`${name}/${Action.Create}`, async (solution) => {
    const response = await axios.put(urls.solution, solution);

    return response.status === 200;
});

export const updateSolution = createAsyncThunk(`${name}/${Action.Update}`, async ({ solutionId, solution }) => {
    const response = await axios.post(`${urls.solution}/${solutionId}`, { solution });

    return response.status === 200;
});

export const removeSolution = createAsyncThunk(
    `${name}/${Action.Remove}`,
    async ({ solutionId, onSuccess }, { dispatch }) => {
        const response = await axios.delete(`${urls.solution}/${solutionId}`);

        dispatch(fetchSolutions());

        if (typeof onSuccess === 'function') {
            onSuccess();
        }
        return response.status === 200;
    }
);
