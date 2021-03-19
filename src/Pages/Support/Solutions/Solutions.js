import React, { useEffect, useState } from 'react';
import MainTextarea from '../../../components/MainTextarea/MainTextarea';
import Searchbar from '../../../components/SearchBar/SearchBar';
import Spinner from '../../../components/Spinner/Spinner';
import { StyledResults } from '../../../components/SrqFinder/SrqResults/StyledSrqResults';
import ErrorBadge from '../../../components/UI/ErrorBadge/ErrorBadge';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import urls from '../../../shared/urls';
import { SolutionResults } from './StyledSolutions';
import SolutionResult from '../../../components/Results/Result/Solution/SolutionResult';

const Solutions = () => {
    const [template, setTemplate] = useState('');
    const [response, error, loading, refresh] = useRequest(urls.solution, null, REQUEST_METHODS.GET);
    const solutions = response?.data || [];
    let content;
    useEffect(() => {
        refresh();
    });
    if (loading) {
        content = <Spinner centered />;
    } else {
        content = solutions.map(({ title, description, man, woman, company, isPublic, _id }) => (
            <SolutionResult
                title={title}
                description={description}
                key={_id}
                man={man}
                woman={woman}
                company={company}
                setTemplate={setTemplate}
                isPublic={isPublic}
            />
        ));
    }
    return (
        <>
            <ErrorBadge message={error?.message} />
            <SolutionResults>
                <Searchbar />
                <StyledResults>{content}</StyledResults>
            </SolutionResults>
            <MainTextarea setTemplate={setTemplate} value={template} />
        </>
    );
};

export default Solutions;
