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
