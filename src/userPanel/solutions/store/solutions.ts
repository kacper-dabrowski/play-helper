import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios from '../../../libs/axios';
import urls from '../../../shared/urls';
import { AddSolutionDto, FetchSolutionsDto, SolutionModel } from './dto';

const name = 'solutions';
enum Action {
    Fetch = 'fetch',
    Create = 'create',
    Remove = 'remove',
    Update = 'update',
}

export const fetchSolutions = createAsyncThunk(`${name}/${Action.Fetch}`, async () => {
    const response: AxiosResponse<FetchSolutionsDto> = await axios.get(urls.solution);

    if (!response.data) {
        return null;
    }

    return mapDto(response.data);
});

function mapDto(solutions: FetchSolutionsDto): SolutionModel[] {
    return solutions.map((solution) => ({ ...solution, id: solution._id, _id: undefined }));
}

export const createSolution = createAsyncThunk(`${name}/${Action.Create}`, async (solution: AddSolutionDto) => {
    const response = await axios.put(urls.solution, solution);

    return response.status === 200;
});

type SolutionUpdatePayload = {
    solutionId: string;
    solution: SolutionModel;
};
export const updateSolution = createAsyncThunk(
    `${name}/${Action.Update}`,
    async ({ solution, solutionId }: SolutionUpdatePayload) => {
        const response = await axios.post(`${urls.solution}/${solutionId}`, solution);

        return response.status === 200;
    }
);

type SolutionRemovePayload = {
    solutionId: string;
    onSuccess?: () => void;
};
export const removeSolution = createAsyncThunk(
    `${name}/${Action.Remove}`,
    async ({ solutionId, onSuccess }: SolutionRemovePayload, { dispatch }) => {
        const response = await axios.delete(`${urls.solution}/${solutionId}`);

        dispatch(fetchSolutions());

        if (typeof onSuccess === 'function') {
            onSuccess();
        }
        return response.status === 200;
    }
);
