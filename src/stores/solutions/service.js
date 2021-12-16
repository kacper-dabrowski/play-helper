import axios from '../../libs/axios';
import { RequestStatus } from '../../shared/requestStatus/requestStatus';
import urls from '../../shared/urls';

export class SolutionsService {
    constructor() {
        this.fetchSolutionsRequest = new RequestStatus();
        this.updateSolutionRequest = new RequestStatus();
        this.addSolutionRequest = new RequestStatus();
        this.removeSolutionRequest = new RequestStatus();
    }

    fetchSolutions = async () => {
        const response = await this.fetchSolutionsRequest.handle(() => axios.get(urls.solution));

        if (!response) {
            return { error: this.fetchSolutionsRequest.error };
        }

        return response.data;
    };

    updateSolution = async ({ solutionId, ...payload }) => {
        const response = await this.updateSolutionRequest.handle(() =>
            axios.post(`${urls.solution}/${solutionId}`, { ...payload.solution })
        );

        if (!response) {
            return { error: this.updateSolutionRequest.error };
        }

        return response.data;
    };

    addSolution = async (payload) => {
        const response = await this.addSolutionRequest.handle(() => axios.put(urls.solution, { ...payload.solution }));

        if (!response) {
            return { error: this.addSolutionRequest.error };
        }

        return response.data;
    };

    removeSolution = async ({ solutionId }) => {
        const response = await this.removeSolutionRequest.handle(() => axios.delete(`${urls.solution}/${solutionId}`));

        if (!response) {
            return { error: this.addSolutionRequest.error };
        }

        return response.data;
    };
}

let solutionsService;

export const createSolutionsService = () => {
    if (!solutionsService) {
        solutionsService = new SolutionsService();
    }

    return solutionsService;
};
