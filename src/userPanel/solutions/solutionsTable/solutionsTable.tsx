import { FC } from 'react';
import { Spinner } from '../../../components/UI/spinner/spinner';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { Maybe } from '../../../shared/types/types';
import { EntriesTable } from '../../components/entriesTable/entriesTable';
import { TableEntry } from '../../components/entriesTable/tableEntry/tableEntry';
import {
    handleDefaultOptionalClick,
    handleEditEntryIfUserIsAnAuthor,
    handleRemoveEntryIfUserIsAnAuthor,
} from '../../handleOptionalClicks';
import { SolutionModel } from '../store/dto';
import { SolutionEntry } from './solutionEntry';

export interface SolutionsTableProps {
    solutions: Maybe<SolutionModel[]>;
    requestStatus: RequestStatus;
    onRemoveEntry?: (solutionId: string) => Promise<void>;
    onEditEntry?: (solution: SolutionModel) => void;
    onClickEntry?: (solution: SolutionModel) => void;
}

export const SolutionsTable: FC<SolutionsTableProps> = ({
    solutions,
    onRemoveEntry,
    onEditEntry,
    onClickEntry,
    requestStatus,
}) => {
    if (requestStatus.loading) {
        return (
            <EntriesTable>
                <Spinner />
            </EntriesTable>
        );
    }

    const entriesList = renderSolutionEntries(solutions, onRemoveEntry, onEditEntry, onClickEntry);

    return <EntriesTable>{entriesList?.length ? entriesList : 'Brak wyników'}</EntriesTable>;
};

function renderSolutionEntries(
    solutions: Maybe<SolutionModel[]>,
    onRemoveEntry?: (solutionId) => Promise<void>,
    onEditEntry?: (solution: SolutionModel) => void,
    onClickEntry?: (solution: SolutionModel) => void
): Maybe<JSX.Element[]> {
    if (!solutions) {
        return null;
    }

    return solutions.map((solution) => {
        const { id, isPublic, isAuthor, title, description, content } = solution;

        return (
            <TableEntry
                key={id}
                renderEntry={() => <SolutionEntry title={title} description={description} content={content} />}
                onClickEntry={handleDefaultOptionalClick<SolutionModel>(solution, onClickEntry)}
                onEditEntry={handleEditEntryIfUserIsAnAuthor<SolutionModel>(solution, isAuthor, onEditEntry)}
                onRemoveEntry={handleRemoveEntryIfUserIsAnAuthor(id, isAuthor, onRemoveEntry)}
                displayGlobeIcon={!!isPublic}
            />
        );
    });
}
