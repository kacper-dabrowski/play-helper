import cogoToast from 'cogo-toast';
import React, { useEffect, useState } from 'react';
import SolutionEditableForm from '../../../components/Forms/SolutionForm/SolutionEditableForm';
import SolutionForm from '../../../components/Forms/SolutionForm/SolutionForm';
import { SolutionResult } from '../../../components/Results/Result/Solution/SolutionResult';
import Searchbar from '../../../components/SearchBar/SearchBar';
import { StyledResults } from '../../../modules/SrqFinder/SrqResults/StyledSrqResults';
import Spinner from '../../../components/UI/Spinner/Spinner';
import useResultsFilter from '../../../hooks/useResultsFilter';
import { solutionSearchMethod } from '../../Support/Solutions/Solutions';
import { SolutionFinderContainer } from './StyledSolution';
import { useErrorNotification } from '../../../hooks/useErrorNotification';

const Solution = ({
    solutions,
    requestStatus,
    refreshSolutions,
    onFetchSolutions,
    onRemoveSolution,
    deletionRequestStatus,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [fieldsToPopulate, setFieldsToPopulate] = useState({});
    const results = solutions || [];
    const [filteredSolutions, searchQuery, setSearchQuery] = useResultsFilter(results, solutionSearchMethod);

    useEffect(() => {
        onFetchSolutions();
    }, [onFetchSolutions]);

    const toggleEditModeAndPopulateFields = (solution) => {
        setEditMode(true);
        setFieldsToPopulate(solution);
    };

    const removeSolutionHandler = async (id) => {
        const onSuccess = () => {
            refreshSolutions();
            cogoToast.success('Rozwiązanie usunięte pomyślnie.');
        };

        onRemoveSolution(id, onSuccess);
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
                />
            ) : (
                <SolutionForm refresh={refreshSolutions} />
            )}
            <SolutionFinderContainer>
                <Searchbar onType={setSearchQuery} value={searchQuery} />
                <StyledResults>{content}</StyledResults>
            </SolutionFinderContainer>
        </>
    );
};

export default Solution;
