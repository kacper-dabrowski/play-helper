import { configureStore } from '@reduxjs/toolkit';
import { mocked } from 'jest-mock';
import axios from '../../libs/axios';
import urls from '../../shared/urls';
import { SupportRequestModel } from './dto';
import {
    createSupportRequest,
    fetchSupportRequests,
    removeSupportRequest,
    updateSupportRequest,
} from './supportRequests';
import supportRequestsSlice from './supportRequestsSlice';

jest.mock('../../libs/axios');

const httpClient = mocked(axios, true);

const defaultStore = configureStore({ reducer: supportRequestsSlice });

describe('stores - supportRequestsSlice', () => {
    let store;
    let dispatch: typeof defaultStore.dispatch;
    let getState: typeof defaultStore.getState;

    beforeEach(() => {
        store = configureStore({ reducer: supportRequestsSlice });
        dispatch = store.dispatch;
        getState = store.getState;
        jest.clearAllMocks();
    });

    describe('fetching support requests', () => {
        const validDto = { supportRequests: [] };

        it('should fetch support requests and update list when successful', async () => {
            givenResponseSuccessful(validDto);

            expect(getState().supportRequests).toEqual(null);

            await dispatch(fetchSupportRequests());

            expect(getState().supportRequests).toEqual([]);
        });

        it('should indicate loading state of fetching', async () => {
            givenResponseSuccessful(validDto);

            dispatch(fetchSupportRequests());

            expect(getState().fetchSupportRequestsStatus.loading).toEqual(true);
        });

        it('should pass error if occurred during fetching', async () => {
            givenResponseFailed();

            expect(getState().supportRequests).toEqual(null);

            await dispatch(fetchSupportRequests());

            expect(getState().supportRequests).toEqual(null);
            expect(getState().fetchSupportRequestsStatus.error).toEqual('get error');
        });
    });

    describe('creating support requests', () => {
        const supportRequest: SupportRequestModel = {
            title: 'title',
            description: 'description',
            department: 'department',
            content: 'content',
        };

        it('should create support request', async () => {
            await dispatch(createSupportRequest(supportRequest));

            expect(axios.put).toHaveBeenCalledWith(urls.srq, supportRequest);
        });

        it('should indicate loading state of creating support request', async () => {
            dispatch(createSupportRequest(supportRequest));

            expect(getState().addSupportRequestsStatus.loading).toEqual(true);
        });

        it('should pass error if occurred during creating support request', async () => {
            givenResponseFailed();

            await dispatch(createSupportRequest(supportRequest));

            expect(getState().addSupportRequestsStatus.error).toEqual('put error');
        });
    });

    describe('updating support requests', () => {
        const id = '1234';
        const supportRequestUpdated = {
            title: 'title updated',
            description: 'description updated',
            department: 'department updated',
            content: 'content updated',
        };

        it('should update support request', async () => {
            await dispatch(updateSupportRequest({ supportRequest: supportRequestUpdated, supportRequestId: id }));

            expect(httpClient.post).toHaveBeenCalledWith(`${urls.srq}/${id}`, {
                supportRequest: supportRequestUpdated,
            });
        });

        it('should indicate loading state of updating support request', async () => {
            dispatch(updateSupportRequest({ supportRequest: supportRequestUpdated, supportRequestId: id }));

            expect(getState().updateSupportRequestStatus.loading).toEqual(true);
        });

        it('should pass error if occurred during updating support request', async () => {
            givenResponseFailed();

            await dispatch(updateSupportRequest({ supportRequest: supportRequestUpdated, supportRequestId: id }));

            expect(getState().updateSupportRequestStatus.error).toEqual('post error');
        });
    });

    describe('removing support requests', () => {
        const id = '1234';

        it('should remove support request', async () => {
            await dispatch(removeSupportRequest({ supportRequestId: id }));

            expect(httpClient.delete).toHaveBeenCalledWith(`${urls.srq}/${id}`);
        });

        it('should indicate loading state of removing support request', async () => {
            dispatch(removeSupportRequest({ supportRequestId: id }));

            expect(getState().removeSupportRequestStatus.loading).toEqual(true);
        });

        it('should pass error if occurred during removing support request', async () => {
            givenResponseFailed();

            await dispatch(removeSupportRequest({ supportRequestId: id }));

            expect(getState().removeSupportRequestStatus.error).toEqual('delete error');
        });
    });

    function givenResponseSuccessful(responseData: any, status = 200) {
        httpClient.get.mockResolvedValue({ data: responseData, status });
    }

    function givenResponseFailed() {
        httpClient.get.mockRejectedValue(new Error('get error'));
        httpClient.post.mockRejectedValue(new Error('post error'));
        httpClient.put.mockRejectedValue(new Error('put error'));
        httpClient.delete.mockRejectedValue(new Error('delete error'));
    }
});
