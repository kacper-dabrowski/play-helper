import cogoToast from 'cogo-toast';
import React, { useEffect, useState } from 'react';
import MainTextarea from '../../../components/Inputs/MainTextarea/MainTextarea';
import { SolutionResult } from '../../../components/Results/Result/Solution/SolutionResult';
import Searchbar from '../../../components/SearchBar/SearchBar';
import { StyledResults } from '../../../modules/SrqFinder/SrqResults/StyledSrqResults';
import Spinner from '../../../components/UI/Spinner/Spinner';
import useResultsFilter from '../../../hooks/useResultsFilter';
import { SolutionResults } from './StyledSolutions';

export const solutionSearchMethod = (results, searchPhrase) =>
    results.filter(
        (result) =>
            result.title.toLowerCase().includes(searchPhrase) ||
            result.description.toLowerCase().includes(searchPhrase) ||
            result.content.toLowerCase().includes(searchPhrase)
    );

const Solutions = ({ requestStatus, solutions, onFetchSolutions }) => {
    const [template, setTemplate] = useState('');
    const [searchResults, searchQuery, setSearchQuery] = useResultsFilter(solutions, solutionSearchMethod);

    useEffect(() => {
        onFetchSolutions();
    }, [onFetchSolutions]);

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
        if (requestStatus.error) {
            cogoToast.error(requestStatus.error);
        }
    }, [requestStatus.error]);

    let results;

    if (requestStatus.loading) {
        results = <Spinner centered />;
    }

    if (!requestStatus.loading && results?.length === 0) {
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
