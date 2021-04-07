import axios from 'axios';
import React, { useState } from 'react';
import SolutionEditableForm from '../../../components/Forms/SolutionForm/SolutionEditableForm';
import SolutionForm from '../../../components/Forms/SolutionForm/SolutionForm';
import SolutionResultWithButtons from '../../../components/Results/Result/Solution/SolutionResultWithButtons/SolutionResultWithButtons';
import Searchbar from '../../../components/SearchBar/SearchBar';
import { StyledResults } from '../../../components/SrqFinder/SrqResults/StyledSrqResults';
import Spinner from '../../../components/UI/Spinner/Spinner';
import useFeedbackSnackbars from '../../../hooks/useFeedbackSnackbars';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import urls from '../../../shared/urls';
import { SolutionFinderContainer } from './StyledSolution';
import useResultsFilter from '../../../hooks/useResultsFilter';
import { solutionSearchMethod } from '../../Support/Solutions/Solutions';

const Solution = () => {
    const [response, error, loading, refresh] = useRequest(urls.solution, REQUEST_METHODS.GET);
    const [setSuccess, setError] = useFeedbackSnackbars();
    const [editMode, setEditMode] = useState(false);
    const [fieldsToPopulate, setFieldsToPopulate] = useState({});
    const results = response?.data || [];
    const [filteredSolutions, searchQuery, setSearchQuery] = useResultsFilter(results, solutionSearchMethod);

    const toggleEditModeAndPopulateFields = (solution) => {
        setEditMode(true);
        setFieldsToPopulate(solution);
    };

    const removeSolutionHandler = async (id) => {
        try {
            setSuccess('');
            await axios.delete(`${urls.solution}/${id}`);
            await refresh();
            setSuccess('Rozwiązanie usunięto pomyślnie');
        } catch (deletionError) {
            setError(error.message);
        }
    };
    let content;
    if (loading) {
        content = <Spinner centered />;
    } else {
        content = filteredSolutions.map((solution) => (
            <SolutionResultWithButtons
                key={solution._id}
                title={solution.title}
                isPublic={solution.isPublic}
                description={solution.description}
                id={solution._id}
                onRemove={removeSolutionHandler}
                onToggleEdit={() => toggleEditModeAndPopulateFields({ ...solution, id: solution._id })}
                isAuthor={solution.isAuthor}
            />
        ));
    }
    return (
        <>
            {editMode ? (
                <SolutionEditableForm populatedFields={fieldsToPopulate} refresh={refresh} setEditMode={setEditMode} />
            ) : (
                <SolutionForm refresh={refresh} />
            )}
            <SolutionFinderContainer>
                <Searchbar onType={setSearchQuery} value={searchQuery} />
                <StyledResults>{content}</StyledResults>
            </SolutionFinderContainer>
        </>
    );
};

export default Solution;
