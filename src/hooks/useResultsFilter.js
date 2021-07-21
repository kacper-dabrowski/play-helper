import { useEffect, useState } from 'react';

const useResultsFilter = (results, filterMethod) => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!searchQuery) {
            setSearchResults(results);
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
