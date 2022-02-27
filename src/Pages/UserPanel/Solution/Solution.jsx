import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SolutionEditableForm from '../../../components/Forms/SolutionForm/SolutionEditableForm';
import SolutionForm from '../../../components/Forms/SolutionForm/SolutionForm';
import { SolutionResult } from '../../../components/Results/Result/Solution/SolutionResult';
import { Spinner } from '../../../components/UI/spinner/spinner';
import { useErrorNotification } from '../../../hooks/useNotification';
import useResultsFilter from '../../../hooks/useResultsFilter';
import { toastProvider } from '../../../libs/toast';
import { StyledResults } from '../../../modules/SrqFinder/SrqResults/StyledSrqResults';
import { updateSolution } from '../../../userPanel/solutions/store/solutions';
import { SearchBox } from '../../../userPanel/components/searchBox/searchBox';
import { solutionSearchMethod } from '../../Support/Solutions/Solutions';
import { SolutionFinderContainer } from './StyledSolution';

const Solution = ({
    solutions,
    requestStatus,
    refreshSolutions,
    onFetchSolutions,
    onRemoveSolution,
    deletionRequestStatus,
}) => {
    const solutionsStore = useSelector((state) => state.solutions);
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);
    const [fieldsToPopulate, setFieldsToPopulate] = useState({});

    const results = useMemo(() => solutions || [], [solutions]);

    const [filteredSolutions, searchQuery, setSearchQuery] = useResultsFilter(results, solutionSearchMethod);

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
        onRemoveSolution(id, () => {
            toastProvider.success('Rozwiązanie usunięte pomyślnie.');
        });
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
                    solutionUpdateRequest={solutionsStore.updateSolutionStatus}
                />
            ) : (
                <SolutionForm refresh={refreshSolutions} />
            )}
            <SolutionFinderContainer>
                <SearchBox setValue={setSearchQuery} value={searchQuery} />
                <StyledResults>{content}</StyledResults>
            </SolutionFinderContainer>
        </>
    );
};

export default Solution;
