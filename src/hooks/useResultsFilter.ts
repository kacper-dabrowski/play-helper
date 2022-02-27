import { useCallback, useEffect, useState } from 'react';
import { Maybe } from '../shared/types/types';

const useResultsFilter = (
    list: Maybe<any[]>,
    filterMethod: (list: Maybe<any[]>, searchQuery: string) => any[]
): [any[], string, (value: string) => void] => {
    const [searchResults, setSearchResults] = useState<any[]>([]);
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

    return [searchResults, searchQuery, setSearchQuery];
};

export default useResultsFilter;
