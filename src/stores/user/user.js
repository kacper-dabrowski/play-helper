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

export const updateUserSettings = createAsyncThunk('user/update-settings', (payload, { dispatch }) => {
    try {
        dispatch(actions.userSettingsUpdate(payload));
    } catch (error) {
        dispatch(actions.userFetchFailed({ error: error.message }));
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
