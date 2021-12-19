import React from 'react';
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

const SrqFinder = ({
    fetchSupportRequestsRequest,
    supportRequests,
    removeSupportRequestRequest,
    onRemoveSupportRequest,
    refresh,
    editable,
    clickable,
    setTemplate,
}) => {
    const [searchResults, searchQuery, setSearchQuery] = useResultsFilter(supportRequests, searchMethod);

    return (
        <StyledSrqFinder>
            <Searchbar onType={setSearchQuery} value={searchQuery} />
            <SrqResults
                onCopy={setTemplate || null}
                supportRequests={searchResults}
                fetchSupportRequestsRequest={fetchSupportRequestsRequest}
                removeSupportRequestRequest={removeSupportRequestRequest}
                onRemoveSupportRequest={onRemoveSupportRequest}
                editable={editable}
                clickable={clickable}
                refresh={refresh}
            />
        </StyledSrqFinder>
    );
};

export default SrqFinder;
