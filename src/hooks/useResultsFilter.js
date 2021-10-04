import { useCallback, useEffect, useMemo, useState } from 'react';

const useResultsFilter = (list, filterMethod) => {
    const results = useMemo(() => list, [list.length]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filterResults = useCallback(() => {
        const filtered = filterMethod(results, searchQuery);

        setSearchResults(filtered);
    }, [filterMethod, results, searchQuery]);

    useEffect(() => {
        if (!searchQuery) {
            setSearchResults(results);
            return;
        }

        if (searchResults.length < 0) {
            return;
        }
        filterResults();
    }, [filterResults, results, searchQuery, searchResults.length]);

    return [searchResults, searchQuery, setSearchQuery];
};

export default useResultsFilter;
