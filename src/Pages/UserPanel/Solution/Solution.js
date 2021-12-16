import React, { useEffect, useState } from 'react';
import SolutionEditableForm from '../../../components/Forms/SolutionForm/SolutionEditableForm';
import SolutionForm from '../../../components/Forms/SolutionForm/SolutionForm';
import { SolutionResult } from '../../../components/Results/Result/Solution/SolutionResult';
import Searchbar from '../../../components/SearchBar/SearchBar';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { useErrorNotification } from '../../../hooks/useErrorNotification';
import useResultsFilter from '../../../hooks/useResultsFilter';
import { StyledResults } from '../../../modules/SrqFinder/SrqResults/StyledSrqResults';
import { updateSolution } from '../../../stores/solutions/solutions';
import { useStore } from '../../../stores/stores';
import { solutionSearchMethod } from '../../Support/Solutions/Solutions';
import { SolutionFinderContainer } from './StyledSolution';

const Solution = ({
    solutions,
    requestStatus,
    refreshSolutions,
    onFetchSolutions,
    onRemoveSolution,
    deletionRequestStatus,
    onAddSolution,
    addSolutionRequest,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [fieldsToPopulate, setFieldsToPopulate] = useState({});
    const results = solutions || [];
    const [filteredSolutions, searchQuery, setSearchQuery] = useResultsFilter(results, solutionSearchMethod);
    const { solutionsStore, dispatch } = useStore();

    const onSolutionUpdate = async (payload) => {
        dispatch(updateSolution(payload));
    };

    useEffect(() => {
        onFetchSolutions();
    }, [onFetchSolutions]);

    const toggleEditModeAndPopulateFields = (solution) => {
        setEditMode(true);
        setFieldsToPopulate(solution);
    };

    const removeSolutionHandler = async (id) => {
        onRemoveSolution(id);
    };

    let content;

    useErrorNotification(requestStatus);
    useErrorNotification(deletionRequestStatus);

    if (requestStatus.loading) {
        content = <Spinner centered />;
    } else {
        content = filteredSolutions.map((solution) => (
            <SolutionResult
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
                <SolutionEditableForm
                    populatedFields={fieldsToPopulate}
                    refresh={refreshSolutions}
                    setEditMode={setEditMode}
                    onSolutionUpdate={onSolutionUpdate}
                    solutionUpdateRequest={solutionsStore.updateSolutionRequest}
                />
            ) : (
                <SolutionForm
                    refresh={refreshSolutions}
                    onAddSolution={onAddSolution}
                    addSolutionRequest={addSolutionRequest}
                />
            )}
            <SolutionFinderContainer>
                <Searchbar onType={setSearchQuery} value={searchQuery} />
                <StyledResults>{content}</StyledResults>
            </SolutionFinderContainer>
        </>
    );
};

export default Solution;
