import { FC } from 'react';
import { Maybe } from '../../../shared/types/types';
import { EntriesTable } from '../../components/entriesTable/entriesTable';
import { TableEntry } from '../../components/entriesTable/tableEntry/tableEntry';
import { SolutionModel } from '../store/dto';

interface SolutionsTableProps {
    solutions: Maybe<SolutionModel[]>;
    onRemoveEntry: (solutionId: string) => Promise<void>;
    onEditEntry: (solution: SolutionModel) => void;
}

const renderSolutionEntries = (
    solutions: Maybe<SolutionModel[]>,
    onRemoveEntry: (solutionId) => Promise<void>,
    onEditEntry: (solution: SolutionModel) => void
): Maybe<JSX.Element[]> => {
    if (!solutions) {
        return null;
    }

    return solutions.map(({ title, description, content, id, isPublic, isAuthor }) => (
        <TableEntry
            key={id}
            renderEntry={() => (
                <div>
                    <div>{title}</div>
                    <div>{description}</div>
                    <div>{content}</div>
                </div>
            )}
            onClickEntry={() => {}}
            onRemoveEntry={!isAuthor ? undefined : () => onRemoveEntry(id)}
            onEditEntry={!isAuthor ? undefined : () => onEditEntry({ title, description, content, id, isPublic })}
            displayGlobeIcon={!!isPublic}
        />
    ));
};

export const SolutionsTable: FC<SolutionsTableProps> = ({ solutions, onRemoveEntry, onEditEntry }) => {
    return <EntriesTable>{renderSolutionEntries(solutions, onRemoveEntry, onEditEntry)}</EntriesTable>;
};
