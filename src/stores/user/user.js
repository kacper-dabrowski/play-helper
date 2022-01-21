import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../libs/axios';
import urls from '../../shared/urls';

export const fetchUserSettings = createAsyncThunk('user/fetch-settings', async () => {
    const response = await axios.get(urls.settings);

    return response?.data?.settings;
});

export const updateUserSettings = createAsyncThunk('user/update-settings', async (payload) => {
    await axios.post(urls.settings, { settings: payload.settings });
});

export const fetchSupportRequests = createAsyncThunk('user/fetch-srq', async () => {
    const response = await axios.get(urls.srq);

    return response.data;
});

export const fetchSolutions = createAsyncThunk('user/fetch-solutions', async () => {
    const response = await axios.get(urls.solution);

    return response.data;
});

export const removeSolution = createAsyncThunk(
    'user/remove-solution',
    async ({ solutionId, onSuccess }, { dispatch }) => {
        await axios.delete(`${urls.solution}/${solutionId}`);

        await dispatch(fetchSolutions());

        if (typeof onSuccess === 'function') {
            onSuccess();
        }
    }
);

export const updateSolution = createAsyncThunk('user/update-solution', async (payload, { dispatch }) => {
    await axios.post(`${urls.solution}/${payload.id}`, { ...payload.updatedSolution });

    await dispatch(fetchSolutions());
});
