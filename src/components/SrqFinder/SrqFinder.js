import React, { useState, useEffect } from 'react';
import useRequest from '../../hooks/useRequest';
import urls from '../../shared/urls';
import SrqResults from './SrqResults/SrqResults';
import { StyledSrqFinder } from './StyledSrqFinder';
import Searchbar from '../SearchBar/SearchBar';
import useFeedbackSnackbars from '../../hooks/useFeedbackSnackbars';

const SrqFinder = (props) => {
    const [response, error, loading, refresh] = useRequest(urls.srq, 'GET', null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [, setError] = useFeedbackSnackbars();

    const { setEntriesRefresh } = props;

    useEffect(() => {
        setEntriesRefresh?.(() => refresh);
        if (error) {
            setError(error.message);
        }
    }, [error]);

    const srqResults = response?.data?.supportRequests || [];

    const onSearch = (searchPhrase) => {
        const search = srqResults.filter((result) => {
            return (
                result.title.toLowerCase().includes(searchPhrase) ||
                result.description.toLowerCase().includes(searchPhrase) ||
                result.department.toLowerCase().includes(searchPhrase)
            );
        });
        setSearchResults(search);
    };

    const searchSrqHandler = (event) => {
        setSearchQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <StyledSrqFinder>
            <Searchbar onType={searchSrqHandler} value={searchQuery} />
            <SrqResults
                onCopy={props.setTemplate && props.setTemplate}
                supportRequests={searchQuery ? searchResults : srqResults}
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
