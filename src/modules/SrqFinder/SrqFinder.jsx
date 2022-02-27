import React from 'react';
import useResultsFilter from '../../hooks/useResultsFilter';
import SrqResults from './SrqResults/SrqResults';
import { StyledSrqFinder } from './StyledSrqFinder';
import { useErrorNotification } from '../../hooks/useNotification';
import { SearchBox } from '../../userPanel/components/searchBox/searchBox';

const searchMethod = (results, searchPhrase) =>
    results.filter(
        (result) =>
            result.title.toLowerCase().includes(searchPhrase) ||
            result.description.toLowerCase().includes(searchPhrase) ||
            result.department.toLowerCase().includes(searchPhrase)
    );

const SrqFinder = ({ requestStatus, supportRequests, refresh, editable, clickable, setTemplate }) => {
    const srqResults = supportRequests;
    const [searchResults, searchQuery, setSearchQuery] = useResultsFilter(srqResults, searchMethod);

    useErrorNotification(requestStatus);

    return (
        <StyledSrqFinder>
            <SearchBox setValue={setSearchQuery} value={searchQuery} />
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
