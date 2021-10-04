import cogoToast from 'cogo-toast';
import React, { useEffect } from 'react';
import useResultsFilter from '../../hooks/useResultsFilter';
import Searchbar from '../../components/SearchBar/SearchBar';
import SrqResults from './SrqResults/SrqResults';
import { StyledSrqFinder } from './StyledSrqFinder';

const searchMethod = (results, searchPhrase) =>
    results.filter(
        (result) =>
            result.title.toLowerCase().includes(searchPhrase) ||
            result.description.toLowerCase().includes(searchPhrase) ||
            result.department.toLowerCase().includes(searchPhrase)
    );

const SrqFinder = ({ requestStatus, supportRequests, refresh, editable, clickable, setTemplate }) => {
    const srqResults = supportRequests || [];
    const [searchResults, searchQuery, setSearchQuery] = useResultsFilter(srqResults, searchMethod);

    useEffect(() => {
        if (requestStatus.error) {
            cogoToast.error(requestStatus.error);
        }
    }, [requestStatus]);

    return (
        <StyledSrqFinder>
            <Searchbar onType={setSearchQuery} value={searchQuery} />
            <SrqResults
                onCopy={setTemplate || null}
                supportRequests={searchResults}
                hasError={requestStatus?.error}
                isLoading={requestStatus.loading}
                editable={editable}
                clickable={clickable}
                refresh={refresh}
            />
        </StyledSrqFinder>
    );
};

export default SrqFinder;
