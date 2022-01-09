import { configureStore } from '@reduxjs/toolkit';
import { fetchSolutions, removeSolution, updateSolution } from './solutions';
import solutionsSlice from './solutionsSlice';
import axios from '../../libs/axios';

describe('stores - solutionsSlice', () => {
    let getState;
    let dispatch;
    let store;
    let axiosSpy;

    beforeEach(() => {
        store = configureStore({
            reducer: solutionsSlice,
        });

        getState = store.getState;
        dispatch = store.dispatch;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('fetchSolutions', () => {
        it('should set request to pending', () => {
            dispatch(fetchSolutions());

            expect(getState().fetchSolutionsRequest).toMatchObject({ loading: true });
        });

        it('should set request to done and update solutions', async () => {
            expect(getState().solutions).toEqual(null);

            withSuccessfulHttpResponse('get', {
                data: [],
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
