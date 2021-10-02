/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        settings: null,
        loading: false,
        error: null,
    },
    reducers: {
        userFetchStart: (state) => {
            state.loading = true;
        },
        userFetchSuccess: (state, action) => {
            state.settings = action.payload.settings;
            state.loading = false;
        },
        userFetchFailed: (state, action) => {
            state.settings = null;
            state.error = action.payload.error;
            state.loading = false;
        },
        userSettingsUpdate: (state, action) => {
            state.settings = action.payload.settings;
        },
    },
});

export const { actions, reducer } = userSlice;

export default userSlice.reducer;
