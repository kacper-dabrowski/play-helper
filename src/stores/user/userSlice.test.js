import { configureStore } from '@reduxjs/toolkit';
import axios from '../../libs/axios';
import { fetchSupportRequests, fetchUserSettings, updateUserSettings } from './user';
import userSlice from './userSlice';

describe('stores - userSlice', () => {
    let getState;
    let dispatch;
    let store;
    let axiosSpy;

    beforeEach(() => {
        store = configureStore({
            reducer: userSlice,
        });

        getState = store.getState;
        dispatch = store.dispatch;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('fetchUserSettings', () => {
        it('should set user request status as pending when request starts', () => {
            withSuccessfulHttpResponse('get', undefined);
            dispatch(fetchUserSettings());

            expect(getState().fetchUserRequestStatus).toMatchObject({
                loading: true,
            });
        });

        it('should update user request when done and update settings in state', async () => {
            withSuccessfulHttpResponse('get', {
                data: {
                    settings: { someSetting: 'someSetting' },
                },
            });

            await dispatch(fetchUserSettings());

            expect(getState().settings).toEqual({ someSetting: 'someSetting' });
        });

        it('should update userFetchRequest request to errored one if request fails', async () => {
            withRequestFailed('get', 'error');

            await dispatch(fetchUserSettings());

            expect(getState().fetchUserRequestStatus.error).toEqual('error');
            expect(getState().settings).toEqual(null);
        });
    });

    describe('updateUserSettings', () => {
        const settings = {
            startingPage: 'page',
        };

        it('should set user settings update request status as pending when request starts', () => {
            withSuccessfulHttpResponse('get', undefined);
            dispatch(updateUserSettings(settings));

            expect(getState().settingsUpdateRequest).toMatchObject({
                loading: true,
            });
        });

        it('should update user request when done and update settings in state', async () => {
            withSuccessfulHttpResponse('post');

            await dispatch(updateUserSettings({ settings }));

            expect(axiosSpy).toHaveBeenCalledWith('http://localhost:3001/user/settings', {
                settings: { startingPage: 'page' },
            });
        });

        it('should update updateUserSettings request to errored one if request fails', async () => {
            withRequestFailed('post', 'error');

            await dispatch(updateUserSettings({ settings }));

            expect(getState().settingsUpdateRequest.error).toEqual('error');
        });
    });

    describe('fetchSupportRequests', () => {
        it('should set request to pending', () => {
            withSuccessfulHttpResponse('get', { data: { supportRequests: [] } });
            dispatch(fetchSupportRequests());

            expect(getState().fetchSupportRequestsStatus).toMatchObject({ loading: true });
        });

        it('should set request to done and update support requests', async () => {
            expect(getState().supportRequests).toEqual(null);

            withSuccessfulHttpResponse('get', {
                data: {
                    supportRequests: [],
                },
            });

            await dispatch(fetchSupportRequests());

            expect(getState().supportRequests).toEqual([]);
        });

        it('should set error message when request fails', async () => {
            expect(getState().supportRequests).toEqual(null);

            withRequestFailed('get', 'error');

            await dispatch(fetchSupportRequests());

            expect(getState().fetchSupportRequestsStatus.error).toEqual('error');
        });
    });

    function withSuccessfulHttpResponse(method, response) {
        axiosSpy = jest.spyOn(axios, method).mockResolvedValue(response);
    }

    function withRequestFailed(method, error) {
        axiosSpy = jest.spyOn(axios, method).mockRejectedValue(new Error(error));
    }
});
