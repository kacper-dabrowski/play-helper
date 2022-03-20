import { useCallback, useEffect, useState } from 'react';
import { Maybe } from '../shared/types/types';

function useResultsFilter<T>(
    list: Maybe<T[]>,
    filterMethod: (list: Maybe<T[]>, searchQuery: string) => T[]
): { searchResults: T[]; searchQuery: string; setSearchQuery: (value: string) => void } {
    const [searchResults, setSearchResults] = useState<T[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filterResults = useCallback(() => {
        const filtered = filterMethod(list, searchQuery);

        setSearchResults(filtered);
    }, [filterMethod, list, searchQuery]);

    useEffect(() => {
        if (!list) {
            return;
        }

        if (!searchQuery) {
            setSearchResults(list);
            return;
        }

        if (searchResults.length < 0) {
            return;
        }
        filterResults();
    }, [filterResults, list, searchQuery, searchResults.length]);

    return { searchResults, searchQuery, setSearchQuery };
}

export default useResultsFilter;
