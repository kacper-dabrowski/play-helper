import { useEffect, useMemo, useState } from 'react';

const useResultsFilter = (list, filterMethod) => {
    const results = useMemo(() => list, [list.length]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!searchQuery) {
            setSearchResults(results);
            return;
        }

        if (searchResults.length < 0) {
            return;
        }
        const filteredResults = filterMethod(results, searchQuery);

        setSearchResults(filteredResults);
    }, [searchQuery, searchResults.length, setSearchResults, filterMethod, results]);

    return [searchResults, searchQuery, setSearchQuery];
};

export default useResultsFilter;
