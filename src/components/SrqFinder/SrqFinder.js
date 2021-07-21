import cogoToast from 'cogo-toast';
import React, { useEffect } from 'react';
import useResultsFilter from '../../hooks/useResultsFilter';
import Searchbar from '../SearchBar/SearchBar';
import SrqResults from './SrqResults/SrqResults';
import { StyledSrqFinder } from './StyledSrqFinder';

const searchMethod = (results, searchPhrase) =>
    results.filter(
        (result) =>
            result.title.toLowerCase().includes(searchPhrase) ||
            result.description.toLowerCase().includes(searchPhrase) ||
            result.department.toLowerCase().includes(searchPhrase)
    );

const SrqFinder = ({ error, response, loading, refresh, editable, clickable, setTemplate }) => {
    const srqResults = response?.data?.supportRequests || [];

    const [searchResults, searchQuery, setSearchQuery] = useResultsFilter(srqResults, searchMethod);

    useEffect(() => {
        if (error) {
            cogoToast.error(error.message);
        }
    }, [error]);

    return (
        <StyledSrqFinder>
            <Searchbar onType={setSearchQuery} value={searchQuery} />
            <SrqResults
                onCopy={setTemplate && setTemplate}
                supportRequests={searchResults}
                hasError={error}
                isLoading={loading}
                editable={editable}
                clickable={clickable}
                refresh={refresh}
            />
        </StyledSrqFinder>
    );
};

export default SrqFinder;
