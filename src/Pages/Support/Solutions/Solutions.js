import React, { useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';
import MainTextarea from '../../../components/MainTextarea/MainTextarea';
import SolutionResult from '../../../components/Results/Result/Solution/SolutionResult';
import Searchbar from '../../../components/SearchBar/SearchBar';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { StyledResults } from '../../../components/SrqFinder/SrqResults/StyledSrqResults';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import urls from '../../../shared/urls';
import { SolutionResults } from './StyledSolutions';
import useResultsFilter from '../../../hooks/useResultsFilter';

export const solutionSearchMethod = (results, searchPhrase) =>
    results.filter(
        (result) =>
            result.title.toLowerCase().includes(searchPhrase) ||
            result.description.toLowerCase().includes(searchPhrase) ||
            result.content.toLowerCase().includes(searchPhrase)
    );

const Solutions = () => {
    const [template, setTemplate] = useState('');
    const [response, error, loading] = useRequest(urls.solution, null, REQUEST_METHODS.GET);
    const solutions = response?.data || [];
    const [searchResults, searchQuery, setSearchQuery] = useResultsFilter(solutions, solutionSearchMethod);

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
            cogoToast.error(error.message);
        }
    }, [error]);

    let results;

    if (loading) {
        results = <Spinner centered />;
    }

    if (!loading && results?.length === 0) {
        results = <p>Brak wyników</p>;
    }

    if (searchResults.length !== 0) {
        results = searchResults.map(normalizeSolutions);
    }

    return (
        <>
            <SolutionResults>
                <Searchbar onType={setSearchQuery} value={searchQuery} />
                <StyledResults>{results}</StyledResults>
            </SolutionResults>
            <MainTextarea setTemplate={setTemplate} value={template} />
        </>
    );
};

export default Solutions;
