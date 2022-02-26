import { useCallback, useEffect, useState } from 'react';

const useResultsFilter = (
    list: any[],
    filterMethod: (list: any[], searchQuery: string) => Array<unknown>
): [any[], string, (value: string) => void] => {
    const [searchResults, setSearchResults] = useState<Array<unknown>>([]);
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
