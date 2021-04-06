import React, { useEffect } from 'react';
import useFeedbackSnackbars from '../../hooks/useFeedbackSnackbars';
import useRequest from '../../hooks/useRequest';
import useResultsFilter from '../../hooks/useResultsFilter';
import urls from '../../shared/urls';
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

const SrqFinder = (props) => {
    const [response, error, loading, refresh] = useRequest(urls.srq, 'GET', null);
    const srqResults = response?.data?.supportRequests || [];
    const [searchResults, searchQuery, setSearchQuery] = useResultsFilter(srqResults, searchMethod);
    const [, setError] = useFeedbackSnackbars();
    const { setEntriesRefresh } = props;

    useEffect(() => {
        setEntriesRefresh?.(() => refresh);
        if (error) {
            setError(error.message);
        }
    }, [error]);

    return (
        <StyledSrqFinder>
            <Searchbar onType={setSearchQuery} value={searchQuery} />
            <SrqResults
                onCopy={props.setTemplate && props.setTemplate}
                supportRequests={searchResults}
                hasError={error}
                isLoading={loading}
                editable={props.editable}
                clickable={props.clickable}
                refresh={refresh}
            />
        </StyledSrqFinder>
    );
};

export default SrqFinder;
