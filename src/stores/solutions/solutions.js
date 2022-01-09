import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../libs/axios';
import urls from '../../shared/urls';

export const fetchSolutions = createAsyncThunk('user/fetch-solutions', async () => {
    try {
        const response = await axios.get(urls.solution);

        return response?.data;
    } catch (error) {
        throw new Error(error?.response?.message || error.message);
    }
});

export const removeSolution = createAsyncThunk(
    'user/remove-solution',
    async ({ solutionId, onSuccess }, { dispatch }) => {
        try {
            await axios.delete(`${urls.solution}/${solutionId}`);

            await dispatch(fetchSolutions());

            if (typeof onSuccess === 'function') {
                onSuccess();
            }
        } catch (error) {
            throw new Error(error?.response?.message || error.message);
        }
    }
);

export const updateSolution = createAsyncThunk('user/update-solution', async (payload, { dispatch }) => {
    try {
        await axios.post(`${urls.solution}/${payload.id}`, { ...payload.updatedSolution });

        await dispatch(fetchSolutions());
    } catch (error) {
        throw new Error(error?.response?.message || error.message);
    }
});
