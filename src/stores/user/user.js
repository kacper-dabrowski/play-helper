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
