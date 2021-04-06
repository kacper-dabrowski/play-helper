import React, { useEffect, useState } from 'react';
import MainTextarea from '../../../components/MainTextarea/MainTextarea';
import SolutionResult from '../../../components/Results/Result/Solution/SolutionResult';
import Searchbar from '../../../components/SearchBar/SearchBar';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { StyledResults } from '../../../components/SrqFinder/SrqResults/StyledSrqResults';
import useFeedbackSnackbars from '../../../hooks/useFeedbackSnackbars';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import urls from '../../../shared/urls';
import { SolutionResults } from './StyledSolutions';

const Solutions = () => {
    const [template, setTemplate] = useState('');
    const [response, error, loading] = useRequest(urls.solution, null, REQUEST_METHODS.GET);
    const [, setError] = useFeedbackSnackbars();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const solutions = response?.data || [];

    const normalizeSolutions = ({ title, description, content, isPublic, _id }) => (
        <SolutionResult
            clickable
            title={title}
            description={description}
            key={_id}
            content={content}
            setTemplate={setTemplate}
            isPublic={isPublic}
        />
    );

    useEffect(() => {
        if (error) {
            setError(error.message);
        }
    }, [error]);
    const onSearch = (searchPhrase) => {
        const search = solutions.filter((result) => {
            return (
                result.title.toLowerCase().includes(searchPhrase) ||
                result.description.toLowerCase().includes(searchPhrase) ||
                result.content.toLowerCase().includes(searchPhrase)
            );
        });
        setSearchResults(search);
    };

    const searchSolutionHandler = (event) => {
        setSearchQuery(event.target.value);
        onSearch(event.target.value);
    };

    let results;

    if (loading) {
        results = <Spinner centered />;
    }
    if (!searchQuery) {
        results = solutions.map(normalizeSolutions);
    } else {
        results = searchResults.map(normalizeSolutions);
    }
    if (results.length === 0) {
        results = <p>Brak wyników</p>;
    }

    return (
        <>
            <SolutionResults>
                <Searchbar onType={searchSolutionHandler} value={searchQuery} />
                <StyledResults>{results}</StyledResults>
            </SolutionResults>
            <MainTextarea setTemplate={setTemplate} value={template} />
        </>
    );
};

export default Solutions;
