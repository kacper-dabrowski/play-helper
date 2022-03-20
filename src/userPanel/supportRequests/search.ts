import { Maybe } from '../../shared/types/types';
import { SupportRequestModel } from './store/dto';

export const solutionSearchMethod = (
    results: Maybe<SupportRequestModel[]>,
    searchPhrase: string
): Array<SupportRequestModel> =>
    results
        ? results.filter(
              (result) =>
                  result.title.toLowerCase().includes(searchPhrase) ||
                  result.description.toLowerCase().includes(searchPhrase) ||
                  result.content.toLowerCase().includes(searchPhrase) ||
                  result.department.toLowerCase().includes(searchPhrase)
          )
        : [];
