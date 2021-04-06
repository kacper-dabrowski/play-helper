import { useEffect, useState } from 'react';

const useResultsFilter = (results, filterMethod) => {
    const [searchResults, setSearchResults] = useState(results);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!searchQuery) {
            return setSearchResults(results);
        }
        const filteredResults = filterMethod(results, searchQuery);
        return setSearchResults(filteredResults);
    }, [searchQuery, results, setSearchResults]);

    return [searchResults, searchQuery, setSearchQuery];
};

export default useResultsFilter;
