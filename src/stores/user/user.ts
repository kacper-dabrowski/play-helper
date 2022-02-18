import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios from '../../libs/axios';
import urls from '../../shared/urls';
import { UserSettingsDto, UserSettingsModel } from './dto';

export const fetchUserSettings = createAsyncThunk('user/fetch-settings', async () => {
    const response: AxiosResponse<UserSettingsDto> = await axios.get(urls.settings);

    return response?.data?.settings;
});

export const updateUserSettings = createAsyncThunk('user/update-settings', async (payload: UserSettingsModel) => {
    await axios.post(urls.settings, { ...payload });
});
