import { makeAutoObservable } from 'mobx';
import { createSolutionsService, SolutionsService } from './service';

export class SolutionsStore {
    constructor(solutionsService = new SolutionsService()) {
        this.solutionsService = solutionsService;
        this.solutions = null;
        makeAutoObservable(this);
    }

    get refreshSolutionsRequest() {
        return this.solutionsService.fetchSolutionsRequest;
    }

    refreshSolutions = async () => {
        const solutions = await this.solutionsService.fetchSolutions();

        this.solutions = solutions;
    };

    get addSolutionRequest() {
        return this.solutionsService.addSolutionRequest;
    }

    addSolution = async (payload) => {
        await this.solutionsService.addSolution(payload);

        await this.refreshSolutions();

        return !!this.solutionsService.addSolutionRequest.error;
    };

    get updateSolutionRequest() {
        return this.solutionsService.updateSolutionRequest;
    }

    updateSolution = async (payload) => {
        await this.solutionsService.updateSolution(payload);

        await this.refreshSolutions();

        return !!this.solutionsService.updateSolutionRequest.error;
    };

    get removeSolutionRequest() {
        return this.solutionsService.removeSolutionRequest;
    }

    removeSolution = async (payload) => {
        await this.solutionsService.removeSolution(payload);

        await this.refreshSolutions();

        return !!this.solutionsService.removeSolutionRequest.error;
    };
}

let solutionsStore;

export const createSolutionsStore = () => {
    if (!solutionsStore) {
        solutionsStore = new SolutionsStore(createSolutionsService());
    }

    return solutionsStore;
};
