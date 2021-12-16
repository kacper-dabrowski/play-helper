import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import SolutionEditableForm from '../../../components/Forms/SolutionForm/SolutionEditableForm';
import SolutionForm from '../../../components/Forms/SolutionForm/SolutionForm';
import { SolutionResult } from '../../../components/Results/Result/Solution/SolutionResult';
import Searchbar from '../../../components/SearchBar/SearchBar';
import Spinner from '../../../components/UI/Spinner/Spinner';
import useResultsFilter from '../../../hooks/useResultsFilter';
import { StyledResults } from '../../../modules/SrqFinder/SrqResults/StyledSrqResults';
import { solutionSearchMethod } from '../../Support/Solutions/Solutions';
import { SolutionFinderContainer } from './StyledSolution';

const Solution = observer(
    ({
        solutions,
        requestStatus,
        refreshSolutions,
        onRemoveSolution,
        deletionRequestStatus,
        onAddSolution,
        addSolutionRequest,
        onUpdateSolution,
        solutionUpdateRequest,
    }) => {
        const [editMode, setEditMode] = useState(false);
        const [fieldsToPopulate, setFieldsToPopulate] = useState({});
        const results = solutions;
        const [filteredSolutions, searchQuery, setSearchQuery] = useResultsFilter(results, solutionSearchMethod);

        useEffect(() => {
            refreshSolutions();
        }, []);

        const toggleEditModeAndPopulateFields = (solution) => {
            setEditMode(true);
            setFieldsToPopulate(solution);
        };

        const removeSolutionHandler = async (solutionId) => {
            onRemoveSolution({ solutionId });
        };

        let content;

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
                        onSolutionUpdate={onUpdateSolution}
                        solutionUpdateRequest={solutionUpdateRequest}
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
    }
);

export default Solution;
