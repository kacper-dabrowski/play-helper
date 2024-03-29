import { configureStore } from '@reduxjs/toolkit';
import { mocked } from 'jest-mock';
import axios from '../../../libs/axios';
import urls from '../../../shared/urls';
import { FetchSolutionsDto, SolutionModel } from './dto';
import { createSolution, fetchSolutions, removeSolution, updateSolution } from './solutions';
import solutionsSlice from './solutionsSlice';

jest.mock('../../../libs/axios');

const httpClient = mocked(axios, true);
const defaultStore = configureStore({ reducer: solutionsSlice });

describe('stores - solutionsSlice', () => {
    let store: typeof defaultStore;
    let dispatch: typeof defaultStore.dispatch;
    let getState: typeof defaultStore.getState;

    beforeEach(() => {
        store = configureStore({ reducer: solutionsSlice });
        dispatch = store.dispatch;
        getState = store.getState;
        jest.resetAllMocks();
    });

    describe('fetching solutions', () => {
        const validDto: FetchSolutionsDto[] = [];

        it('should fetch solutions and update list when successful', async () => {
            givenResponseSuccessful(validDto);

            expect(getState().solutions).toEqual(null);

            await dispatch(fetchSolutions());

            expect(getState().solutions).toEqual([]);
        });

        it('should indicate loading state of fetching', async () => {
            givenResponseSuccessful(validDto);

            dispatch(fetchSolutions());

            expect(getState().fetchSolutionsStatus.loading).toEqual(true);
        });

        it('should pass error if occurred during fetching', async () => {
            givenResponseFailed();

            expect(getState().solutions).toEqual(null);

            await dispatch(fetchSolutions());

            expect(getState().solutions).toEqual(null);
            expect(getState().fetchSolutionsStatus.error).toEqual('get error');
        });
    });

    describe('creating solutions', () => {
        const solution: SolutionModel = {
            id: '1234',
            title: 'title',
            description: 'description',
            content: 'content',
            isPublic: false,
        };

        it('should create solution', async () => {
            await dispatch(createSolution(solution));

            expect(axios.put).toHaveBeenCalledWith(urls.solution, solution);
        });

        it('should indicate loading state of creating solution', async () => {
            dispatch(createSolution(solution));

            expect(getState().addSolutionStatus.loading).toEqual(true);
        });

        it('should pass error if occurred during creating solution', async () => {
            givenResponseFailed();

            await dispatch(createSolution(solution));

            expect(getState().addSolutionStatus.error).toEqual('put error');
        });
    });

    describe('updating solutions', () => {
        const id = '1234';
        const solutionUpdated: SolutionModel = {
            id: '1234',
            title: 'title updated',
            description: 'description updated',
            content: 'content updated',
            isPublic: false,
        };

        it('should update solution', async () => {
            await dispatch(updateSolution({ solution: solutionUpdated, solutionId: id }));

            expect(axios.post).toHaveBeenCalledWith(`${urls.solution}/${id}`, solutionUpdated);
        });

        it('should indicate loading state of updating solution', async () => {
            dispatch(updateSolution({ solution: solutionUpdated, solutionId: id }));

            expect(getState().updateSolutionStatus.loading).toEqual(true);
        });

        it('should pass error if occurred during updating solution', async () => {
            givenResponseFailed();

            await dispatch(updateSolution({ solution: solutionUpdated, solutionId: id }));

            expect(getState().updateSolutionStatus.error).toEqual('post error');
        });
    });

    describe('removing solutions', () => {
        const id = '1234';

        it('should remove solution', async () => {
            await dispatch(removeSolution({ solutionId: id }));

            expect(axios.delete).toHaveBeenCalledWith(`${urls.solution}/${id}`);
        });

        it('should call onSuccess  when solution removed successfully', async () => {
            const onSuccessMock = jest.fn();

            await dispatch(removeSolution({ solutionId: id, onSuccess: onSuccessMock }));

            expect(axios.delete).toHaveBeenCalledWith(`${urls.solution}/${id}`);
            expect(onSuccessMock).toHaveBeenCalled();
        });

        it('should indicate loading state of removing solution', async () => {
            dispatch(removeSolution({ solutionId: id }));

            expect(getState().removeSolutionStatus.loading).toEqual(true);
        });

        it('should pass error if occurred during removing solution and not call onSuccess', async () => {
            givenResponseFailed();
            const onSuccessMock = jest.fn();

            await dispatch(removeSolution({ solutionId: id, onSuccess: onSuccessMock }));

            expect(getState().removeSolutionStatus.error).toEqual('delete error');
            expect(onSuccessMock).not.toHaveBeenCalled();
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
