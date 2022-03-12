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

export const fakeFetchSolutionsDto: FetchedSolution[] = [
    { title: 'Fake title', description: 'Fake description', content: 'Fake content', isPublic: false, _id: '1234' },
];

export const fakeSolutionModel: SolutionModel = {
    title: 'Fake title',
    description: 'Fake description',
    content: 'Fake content',
    isPublic: false,
    id: '1234',
};
