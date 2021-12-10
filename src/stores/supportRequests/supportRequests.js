import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import axios from '../../libs/axios';
import urls from '../../shared/urls';

export const fetchSupportRequests = createAsyncThunk('supportRequests/fetch', async (payload, { dispatch }) => {
    try {
        dispatch(actions.fetchSupportRequestsStart());

        const response = await axios.get(urls.srq);

        dispatch(actions.fetchSupportRequestsSuccess(response.data));
    } catch (error) {
        dispatch(actions.fetchSupportRequestsFail({ error: error?.response?.message || error.message }));
    }
});

export const removeSupportRequests = createAsyncThunk('supportRequests/remove', async (payload, { dispatch }) => {
    try {
        dispatch(actions.removeSupportRequestStart());

        await axios.delete(`${urls.srq}/${payload.srqId}`);

        dispatch(actions.removeSupportRequestSuccess());

        dispatch(fetchSupportRequests());
    } catch (error) {
        dispatch(actions.removeSupportRequestFail({ error: error?.response?.message || error.message }));
    }
});

export const addSupportRequest = createAsyncThunk('supportRequests/add', async (payload, { dispatch }) => {
    try {
        dispatch(actions.addSupportRequestStart());

        await axios.put(`${urls.srq}`, { ...payload.srq });

        dispatch(actions.addSupportRequestSuccess());
    } catch (error) {
        dispatch(actions.addSupportRequestFail({ error: error?.response?.message || error.message }));
    }
});

export const updateSupportRequest = createAsyncThunk('supportRequests/update', async (payload, { dispatch }) => {
    try {
        dispatch(actions.updateSupportRequestStart());

        await axios.post(`${urls.srq}/${payload.srqId}`, { ...payload.srq });

        dispatch(actions.updateSupportRequestSuccess());
    } catch (error) {
        dispatch(actions.updateSupportRequestFail({ error: error?.response?.message || error.message }));
    }
});
