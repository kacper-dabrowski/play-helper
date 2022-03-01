import { FC, useMemo } from 'react';
import { Spinner } from '../../../components/UI/spinner/spinner';
import { Maybe } from '../../../shared/types/types';
import { EntriesTable } from '../../components/entriesTable/entriesTable';
import { TableEntry } from '../../components/entriesTable/tableEntry/tableEntry';
import {
    handleClickEntry,
    handleEditEntryIfUserIsAnAuthor,
    handleRemoveEntryIfUserIsAnAuthor,
} from '../../handleOptionalClicks';
import { SolutionModel } from '../store/dto';

interface SolutionsTableProps {
    solutions: Maybe<SolutionModel[]>;
    onRemoveEntry?: (solutionId: string) => Promise<void>;
    onEditEntry?: (solution: SolutionModel) => void;
    onClickEntry?: (solution: SolutionModel) => void;
}

const renderSolutionEntries = (
    solutions: Maybe<SolutionModel[]>,
    onRemoveEntry?: (solutionId) => Promise<void>,
    onEditEntry?: (solution: SolutionModel) => void,
    onClickEntry?: (solution: SolutionModel) => void
): Maybe<JSX.Element[]> => {
    if (!solutions) {
        return null;
    }

    return solutions.map((solution) => {
        const { id, isPublic, isAuthor, title, description, content } = solution;

        return (
            <TableEntry
                key={id}
                renderEntry={() => (
                    <div>
                        <div>{title}</div>
                        <div>{description}</div>
                        <div>{content}</div>
                    </div>
                )}
                onClickEntry={handleClickEntry<SolutionModel>(solution, onClickEntry)}
                onEditEntry={handleEditEntryIfUserIsAnAuthor<SolutionModel>(solution, isAuthor, onEditEntry)}
                onRemoveEntry={handleRemoveEntryIfUserIsAnAuthor(id, isAuthor, onRemoveEntry)}
                displayGlobeIcon={!!isPublic}
            />
        );
    });
};

export const SolutionsTable: FC<SolutionsTableProps> = ({ solutions, onRemoveEntry, onEditEntry, onClickEntry }) => {
    const entriesList = useMemo(
        () => renderSolutionEntries(solutions, onRemoveEntry, onEditEntry, onClickEntry),
        [onClickEntry, onEditEntry, onRemoveEntry, solutions]
    );

    return <EntriesTable>{entriesList?.length ? entriesList : <Spinner />}</EntriesTable>;
};
