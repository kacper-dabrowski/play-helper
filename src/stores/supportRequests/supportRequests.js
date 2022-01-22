import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../libs/axios';
import urls from '../../shared/urls';

const name = 'support-requests';
const Action = {
    Fetch: 'fetch',
    Create: 'create',
    Remove: 'remove',
    Update: 'update',
};

export const fetchSupportRequests = createAsyncThunk(`${name}/${Action.Fetch}`, async () => {
    const response = await axios.get(urls.srq);

    return response?.data?.supportRequests;
});

export const createSupportRequest = createAsyncThunk(`${name}/${Action.Create}`, async (supportRequest) => {
    const response = await axios.put(urls.srq, supportRequest);

    return response.status === 200;
});

export const updateSupportRequest = createAsyncThunk(
    `${name}/${Action.Update}`,
    async ({ supportRequestId, supportRequest }) => {
        const response = await axios.post(`${urls.srq}/${supportRequestId}`, { supportRequest });

        return response.status === 200;
    }
);

export const removeSupportRequest = createAsyncThunk(`${name}/${Action.Remove}`, async ({ supportRequestId }) => {
    const response = await axios.delete(`${urls.srq}/${supportRequestId}`);

    return response.status === 200;
});
