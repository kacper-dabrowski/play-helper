import { Maybe } from '../../shared/types/types';
import { SolutionModel } from './store/dto';

export const solutionSearchMethod = (results: Maybe<SolutionModel[]>, searchPhrase: string): Array<SolutionModel> =>
    results
        ? results.filter(
              (result) =>
                  result.title.toLowerCase().includes(searchPhrase) ||
                  result.description.toLowerCase().includes(searchPhrase) ||
                  result.content.toLowerCase().includes(searchPhrase)
          )
        : [];
