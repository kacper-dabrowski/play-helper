import { configureStore } from '@reduxjs/toolkit';
import {
    fetchSolutions,
    fetchSupportRequests,
    fetchUserSettings,
    removeSolution,
    updateSolution,
    updateUserSettings,
} from './user';
import userSlice from './userSlice';
import axios from '../../libs/axios';

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

    describe('fetchSolutions', () => {
        it('should set request to pending', () => {
            dispatch(fetchSolutions());

            expect(getState().fetchSolutionsRequest).toMatchObject({ loading: true });
        });

        it('should set request to done and update solutions', async () => {
            expect(getState().solutions).toEqual(null);

            withSuccessfulHttpResponse('get', {
                data: {
                    solutions: [],
                },
            });

            await dispatch(fetchSolutions());

            expect(getState().solutions).toEqual([]);
        });

        it('should set error message when request fails', async () => {
            expect(getState().solutions).toEqual(null);

            withRequestFailed('get', 'error');

            await dispatch(fetchSolutions());

            expect(getState().fetchSolutionsRequest.error).toEqual('error');
        });
    });

    describe('removeSolutions', () => {
        const solutionId = '1234';
        const onSuccess = jest.fn();

        it('should set request to pending', () => {
            withSuccessfulHttpResponse('delete');
            dispatch(removeSolution({ solutionId }));

            expect(getState().removeSolutionRequest).toMatchObject({ loading: true });
        });

        it('should call remove solution request with solution id', async () => {
            withSuccessfulHttpResponse('delete');
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: {
                    solutions: [],
                },
            });

            await dispatch(removeSolution({ solutionId }));

            expect(axiosSpy).toHaveBeenCalledWith('http://localhost:3001/solutions/1234');
        });

        it('should call remove solution request with solution id and call onSuccess if passed', async () => {
            withSuccessfulHttpResponse('delete');
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: {
                    solutions: [],
                },
            });

            await dispatch(removeSolution({ solutionId, onSuccess }));

            expect(axiosSpy).toHaveBeenCalledWith('http://localhost:3001/solutions/1234');
            expect(onSuccess).toHaveBeenCalled();
        });

        it('should set error message when request fails', async () => {
            withRequestFailed('delete', 'error');

            await dispatch(removeSolution({ solutionId }));

            expect(getState().removeSolutionRequest.error).toEqual('error');
        });
    });

    describe('updateSolution', () => {
        const payload = {
            updatedSolution: {
                title: 'title',
            },
            id: '1234',
        };

        it('should set user settings update request status as pending when request starts', () => {
            withSuccessfulHttpResponse('get', undefined);
            dispatch(updateSolution(payload));
            jest.spyOn(axios, 'get');

            expect(getState().solutionUpdateRequest).toMatchObject({
                loading: true,
            });
        });

        it('should update user request when done and update settings in state', async () => {
            withSuccessfulHttpResponse('post');
            jest.spyOn(axios, 'get');

            await dispatch(updateSolution(payload));

            expect(axiosSpy).toHaveBeenCalledWith('http://localhost:3001/solutions/1234', payload.updatedSolution);
        });

        it('should update updateSolution request to errored one if request fails', async () => {
            withRequestFailed('post', 'error');
            jest.spyOn(axios, 'get');

            await dispatch(updateSolution(payload));

            expect(getState().solutionUpdateRequest.error).toEqual('error');
        });
    });

    function withSuccessfulHttpResponse(method, response) {
        axiosSpy = jest.spyOn(axios, method).mockResolvedValue(response);
    }

    function withRequestFailed(method, error) {
        axiosSpy = jest.spyOn(axios, method).mockRejectedValue(new Error(error));
    }
});
