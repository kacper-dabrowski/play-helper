import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useResultsFilter from '../../hooks/useResultsFilter';
import { toastProvider } from '../../libs/toast';
import { Maybe } from '../../shared/types/types';
import { StoreState } from '../../stores/store';
import { SearchBox } from '../components/searchBox/searchBox';
import { SolutionForm } from './form/form';
import { SolutionsTable } from './solutionsTable/solutionsTable';
import { AddSolutionDto, SolutionModel } from './store/dto';
import { createSolution, fetchSolutions, removeSolution, updateSolution } from './store/solutions';
import * as Styles from '../components/styles/styledContainer';
import { searchByContainingSearchPhrase } from '../components/search/search';

export const SolutionsEditor: FC = () => {
    const { solutions, addSolutionStatus, fetchSolutionsStatus } = useSelector((state: StoreState) => state.solutions);
    const {
        searchResults: filteredSolutions,
        searchQuery,
        setSearchQuery,
    } = useResultsFilter(solutions, searchByContainingSearchPhrase);
    const dispatch = useDispatch();
    const [selectedSolution, setSelectedSolution] = useState<Maybe<SolutionModel>>(null);

    useEffect(() => {
        dispatch(fetchSolutions());
    }, [dispatch]);

    const onAddSolution = useCallback(
        async (solution: AddSolutionDto) => {
            await dispatch(createSolution(solution));
        },
        [dispatch]
    );

    const onEditSolution = useCallback(
        async (solution: SolutionModel) => {
            await dispatch(updateSolution({ solutionId: solution.id, solution }));
        },
        [dispatch]
    );

    const onRemoveSolution = useCallback(
        async (solutionId: string) => {
            await dispatch(
                removeSolution({ solutionId, onSuccess: () => toastProvider.success('Rozwiązanie usunięte pomyślnie') })
            );
        },
        [dispatch]
    );

    const onFetchSolution = useCallback(async () => {
        await dispatch(fetchSolutions());
    }, [dispatch]);

    return (
        <>
            <SolutionForm
                addSolutionStatus={addSolutionStatus}
                onAddSolution={onAddSolution}
                onEditSolution={onEditSolution}
                onClearForm={() => setSelectedSolution(null)}
                selectedSolution={selectedSolution}
                onRefreshSolutions={onFetchSolution}
            />
            <Styles.container>
                <SearchBox setValue={setSearchQuery} value={searchQuery} />
                <SolutionsTable
                    requestStatus={fetchSolutionsStatus}
                    solutions={filteredSolutions}
                    onRemoveEntry={onRemoveSolution}
                    onEditEntry={setSelectedSolution}
                />
            </Styles.container>
        </>
    );
};
