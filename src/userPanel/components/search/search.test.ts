import { SolutionModel } from '../../solutions/store/dto';
import { searchByContainingSearchPhrase } from './search';

describe('userPanel - solutions - search', () => {
    it('should return no results, if solutions are empty', () => {
        expect(searchByContainingSearchPhrase<SolutionModel>([], 'some-phrase')).toEqual([]);
    });

    it('should return all results, if search phrase empty', () => {
        const solutions: SolutionModel[] = [
            { title: 'title', content: 'content', isPublic: false, id: '1234', description: 'description' },
        ];

        expect(searchByContainingSearchPhrase<SolutionModel>(solutions, '')).toEqual(solutions);
    });

    [
        {
            element: 'title, content or description',
            matchingResults: withResultsContainingWordsInEveryProp('some-word'),
        },
        { element: 'title', matchingResults: withResultsHavingWordInTitle('some-word') },
        { element: 'content', matchingResults: withResultsHavingWordInContent('some-word') },
        { element: 'description', matchingResults: withResultsHavingWordInDescription('some-word') },
    ].forEach(({ element, matchingResults }) => {
        it(`should return matching results, if ${element} contains phrase`, () => {
            const arrayToTest = [...matchingResults, ...noSolutionsMatchCriteria()];
            expect(searchByContainingSearchPhrase<SolutionModel>(arrayToTest, 'some-word')).toEqual(matchingResults);
        });
    });

    it('should search with case insensitivity', () => {
        const expectedResults = withResultsContainingWordsInEveryProp('SomE-wOrD');

        const arrayToTest = [...expectedResults, ...noSolutionsMatchCriteria()];

        expect(searchByContainingSearchPhrase<SolutionModel>(arrayToTest, 'some-word')).toEqual(expectedResults);
    });

    function noSolutionsMatchCriteria() {
        return createArray(10).map((_, index) => ({
            title: `title${index}`,
            content: `content${index}`,
            isPublic: false,
            id: '1234',
            description: `description${index}`,
        }));
    }

    function withResultsContainingWordsInEveryProp(word: string) {
        return noSolutionsMatchCriteria().map((solution, index) => ({
            ...solution,
            title: `title${word}${index}`,
            description: `description${word}${index}`,
            content: `content${word}${index}`,
        }));
    }

    function withResultsHavingWordInTitle(word: string) {
        return noSolutionsMatchCriteria().map((solution, index) => ({
            ...solution,
            title: `title${word}${index}`,
        }));
    }

    function withResultsHavingWordInContent(word: string) {
        return noSolutionsMatchCriteria().map((solution, index) => ({
            ...solution,
            content: `content${word}${index}`,
        }));
    }

    function withResultsHavingWordInDescription(word: string) {
        return noSolutionsMatchCriteria().map((solution, index) => ({
            ...solution,
            description: `description${word}${index}`,
        }));
    }
});

function createArray(size: number) {
    return Array(size).fill(null);
}
