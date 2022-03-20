import { Maybe } from '../../../shared/types/types';

export function searchByContainingSearchPhrase<T>(results: Maybe<T[]>, searchPhrase: string): T[] {
    const filteredResults = results?.filter((result) => {
        const keys = Object.keys(result);

        return keys.some((key) => {
            if (typeof result[key] !== 'string') {
                return false;
            }

            return result[key].toLowerCase().includes(searchPhrase.toLowerCase());
        });
    });

    return filteredResults?.length ? filteredResults : [];
}
