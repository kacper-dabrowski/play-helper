import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import MainTextarea from '../../../components/MainTextarea/MainTextarea';
import SolutionResult from '../../../components/Results/Result/Solution/SolutionResult';
import Searchbar from '../../../components/SearchBar/SearchBar';
import Spinner from '../../../components/Spinner/Spinner';
import { StyledResults } from '../../../components/SrqFinder/SrqResults/StyledSrqResults';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import urls from '../../../shared/urls';
import { SolutionResults } from './StyledSolutions';

const Solutions = () => {
    const [template, setTemplate] = useState('');
    const [response, error, loading] = useRequest(urls.solution, null, REQUEST_METHODS.GET);
    const [openErrorSnackbar] = useSnackbar();

    useEffect(() => {
        if (error) {
            openErrorSnackbar(error.message);
        }
    }, [error]);

    const solutions = response?.data || [];
    let results;

    if (loading) {
        results = <Spinner centered />;
    } else {
        results = solutions.map(({ title, description, content, isPublic, _id }) => (
            <SolutionResult
                clickable
                title={title}
                description={description}
                key={_id}
                content={content}
                setTemplate={setTemplate}
                isPublic={isPublic}
            />
        ));
    }

    return (
        <>
            <SolutionResults>
                <Searchbar />
                <StyledResults>{results}</StyledResults>
            </SolutionResults>
            <MainTextarea setTemplate={setTemplate} value={template} />
        </>
    );
};

export default Solutions;
