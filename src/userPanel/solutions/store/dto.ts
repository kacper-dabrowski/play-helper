interface Solution {
    title: string;
    description: string;
    content: string;
    isAuthor?: boolean;
    isPublic: boolean;
}

interface FetchedSolution extends Solution {
    _id: string;
}

export type FetchSolutionsDto = FetchedSolution[];

export interface SolutionModel extends Solution {
    id: string;
}

export type AddSolutionDto = Solution;
