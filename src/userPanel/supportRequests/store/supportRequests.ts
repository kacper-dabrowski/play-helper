import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios from '../../../libs/axios';
import urls from '../../../shared/urls';
import { SupportRequestModel, SupportRequestsDto } from './dto';

const name = 'support-requests';
const Action = {
    Fetch: 'fetch',
    Create: 'create',
    Remove: 'remove',
    Update: 'update',
};

export const fetchSupportRequests = createAsyncThunk(`${name}/${Action.Fetch}`, async () => {
    const response: AxiosResponse<SupportRequestsDto> = await axios.get(urls.srq);

    return response?.data?.supportRequests;
});

export const createSupportRequest = createAsyncThunk(
    `${name}/${Action.Create}`,
    async ({ title, department, description, content }: SupportRequestModel) => {
        const response = await axios.put(urls.srq, { title, department, description, content });

        return response.status === 200;
    }
);

type UpdateSupportRequestPayload = {
    supportRequestId: string;
    supportRequest: SupportRequestModel;
};

export const updateSupportRequest = createAsyncThunk(
    `${name}/${Action.Update}`,
    async ({
        supportRequestId,
        supportRequest: { title, content, department, description },
    }: UpdateSupportRequestPayload) => {
        const response = await axios.post(`${urls.srq}/${supportRequestId}`, {
            title,
            content,
            department,
            description,
        });

        return response.status === 200;
    }
);

type RemoveSupportRequestPayload = {
    supportRequestId: string;
};
export const removeSupportRequest = createAsyncThunk(
    `${name}/${Action.Remove}`,
    async ({ supportRequestId }: RemoveSupportRequestPayload) => {
        const response = await axios.delete(`${urls.srq}/${supportRequestId}`);

        return response.status === 200;
    }
);
