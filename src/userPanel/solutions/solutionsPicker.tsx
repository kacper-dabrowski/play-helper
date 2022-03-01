import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainTextarea } from '../../components/Inputs/MainTextarea/MainTextarea';
import useResultsFilter from '../../hooks/useResultsFilter';
import { Maybe } from '../../shared/types/types';
import { StoreState } from '../../stores/store';
import { SearchBox } from '../components/searchBox/searchBox';
import { solutionSearchMethod } from './search';
import { SolutionsTable } from './solutionsTable/solutionsTable';
import { SolutionModel } from './store/dto';
import { fetchSolutions } from './store/solutions';
import * as Styles from './styledSolutionsContainer';

export const SolutionPicker: FC = () => {
    const [template, setTemplate] = useState<Maybe<string>>();
    const { solutions } = useSelector((state: StoreState) => state.solutions);
    const dispatch = useDispatch();
    const [filteredSolutions, searchQuery, setSearchQuery] = useResultsFilter(solutions, solutionSearchMethod);

    useEffect(() => {
        dispatch(fetchSolutions());
    }, [dispatch]);

    return (
        <>
            <Styles.container>
                <SearchBox setValue={setSearchQuery} value={searchQuery} />
                <SolutionsTable
                    onClickEntry={(solution: SolutionModel) => setTemplate(solution.content)}
                    solutions={filteredSolutions}
                />
            </Styles.container>
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};
