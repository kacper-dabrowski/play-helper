import React from 'react';
import axios from 'axios';
import SolutionForm from '../../../components/Forms/SolutionForm/SolutionForm';
import SolutionResultWithButtons from '../../../components/Results/Result/Solution/SolutionResultWithButtons/SolutionResultWithButtons';
import Searchbar from '../../../components/SearchBar/SearchBar';
import { StyledResults } from '../../../components/SrqFinder/SrqResults/StyledSrqResults';
import { SolutionFinderContainer } from './StyledSolution';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import urls from '../../../shared/urls';
import ErrorBadge from '../../../components/UI/ErrorBadge/ErrorBadge';
import Spinner from '../../../components/Spinner/Spinner';
import useFeedbackSnackbars from '../../../hooks/useFeedbackSnackbars';

const Solution = () => {
    const [response, error, loading, refresh] = useRequest(urls.solution, REQUEST_METHODS.GET);
    const [setSuccess, setError] = useFeedbackSnackbars();
    const removeSolutionHandler = async (id) => {
        try {
            await axios.delete(`${urls.solution}/${id}`);
            await refresh();
            setSuccess('Rozwiązanie usunięto pomyślnie');
        } catch (deletionError) {
            setError(error.message);
        }
    };
    let content;
    const solutions = response?.data || [];
    if (loading) {
        content = <Spinner centered />;
    } else {
        content = solutions.map(({ _id, title, description, isPublic, isAuthor }) => (
            <SolutionResultWithButtons
                key={_id}
                title={title}
                isPublic={isPublic}
                description={description}
                id={_id}
                onRemove={removeSolutionHandler}
                isAuthor={isAuthor}
            />
        ));
    }
    return (
        <>
            <ErrorBadge message={error?.message} />
            <SolutionForm refresh={refresh} />
            <SolutionFinderContainer>
                <Searchbar />
                <StyledResults>{content}</StyledResults>
            </SolutionFinderContainer>
        </>
    );
};

export default Solution;
