import { configureStore } from '@reduxjs/toolkit';
import axios from '../../libs/axios';
import urls from '../../shared/urls';
import { createSolution, fetchSolutions, removeSolution, updateSolution } from './solutions';
import solutionsSlice from './solutionsSlice';

jest.mock('../../libs/axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

describe('stores - solutionsSlice', () => {
    let store;
    let dispatch;
    let getState;

    beforeEach(() => {
        store = configureStore({ reducer: solutionsSlice });
        dispatch = store.dispatch;
        getState = store.getState;
        jest.clearAllMocks();
    });

    describe('fetching solutions', () => {
        const validDto = { solutions: [] };

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
        const solution = {
            title: 'title',
            description: 'description',
            content: 'content',
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
        const solutionUpdated = {
            title: 'title updated',
            description: 'description updated',
            content: 'content updated',
        };

        it('should update solution', async () => {
            await dispatch(updateSolution({ solution: solutionUpdated, solutionId: id }));

            expect(axios.post).toHaveBeenCalledWith(`${urls.solution}/${id}`, { solution: solutionUpdated });
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

        it('should indicate loading state of removing solution', async () => {
            dispatch(removeSolution({ solutionId: id }));

            expect(getState().removeSolutionStatus.loading).toEqual(true);
        });

        it('should pass error if occurred during removing solution', async () => {
            givenResponseFailed();

            await dispatch(removeSolution({ solutionId: id }));

            expect(getState().removeSolutionStatus.error).toEqual('delete error');
        });
    });

    function givenResponseSuccessful(responseData, status = 200) {
        axios.get.mockResolvedValue({ data: responseData, status });
    }

    function givenResponseFailed() {
        axios.get.mockRejectedValue(new Error('get error'));
        axios.post.mockRejectedValue(new Error('post error'));
        axios.put.mockRejectedValue(new Error('put error'));
        axios.delete.mockRejectedValue(new Error('delete error'));
    }
});
