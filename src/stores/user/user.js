import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../libs/axios';
import urls from '../../shared/urls';
import { actions } from './userSlice';

export const fetchUserSettings = createAsyncThunk('user/fetch-settings', async (payload, { dispatch }) => {
    dispatch(actions.userFetchStart());
    try {
        const response = await axios.get(urls.settings);

        dispatch(actions.userFetchSuccess({ settings: response.data.settings }));
    } catch (error) {
        dispatch(actions.userFetchFail({ error: error.message }));
    }
});

export const updateUserSettings = createAsyncThunk('user/update-settings', async (payload, { dispatch }) => {
    try {
        dispatch(actions.settingsUpdateStart());

        await axios.post(urls.settings, { settings: payload.settings });

        dispatch(actions.settingsUpdateSuccess({ settings: payload.settings }));
    } catch (error) {
        dispatch(actions.settingsUpdateFail({ error: error.message }));
    }
});

export const fetchSupportRequests = createAsyncThunk('user/fetch-srq', async (payload, { dispatch }) => {
    try {
        dispatch(actions.supportRequestsFetchStart());

        const response = await axios.get(urls.srq);

        dispatch(actions.supportRequestsFetchSuccess(response.data));
    } catch (error) {
        dispatch(actions.supportRequestsFetchFail({ error: error?.response?.message || error.message }));
    }
});

export const fetchSolutions = createAsyncThunk('user/fetch-solutions', async (payload, { dispatch }) => {
    try {
        dispatch(actions.solutionsFetchStart());

        const response = await axios.get(urls.solution);

        dispatch(actions.solutionsFetchSuccess({ solutions: response.data }));
    } catch (error) {
        dispatch(actions.solutionsFetchFail({ error: error?.response?.message || error.message }));
    }
});

export const removeSolution = createAsyncThunk(
    'user/remove-solution',
    async ({ solutionId, onSuccess }, { dispatch }) => {
        try {
            dispatch(actions.solutionRemoveStart());

            await axios.delete(`${urls.solution}/${solutionId}`);

            dispatch(actions.solutionRemoveSuccess());

            await dispatch(fetchSolutions());

            if (typeof onSuccess === 'function') {
                onSuccess();
            }
        } catch (error) {
            dispatch(actions.solutionRemoveFail({ error: error?.response?.message || error.message }));
        }
    }
);

export const updateSolution = createAsyncThunk('user/update-solution', async (payload, { dispatch }) => {
    try {
        dispatch(actions.solutionUpdateStart());

        await axios.post(`${urls.solution}/${payload.id}`, { ...payload.updatedSolution });

        await dispatch(fetchSolutions());

        dispatch(actions.solutionUpdateSuccess());
    } catch (error) {
        dispatch(actions.solutionUpdateFail({ error: error.message }));
    }
});
