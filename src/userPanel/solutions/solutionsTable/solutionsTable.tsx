import { FC } from 'react';
import { Maybe } from '../../../shared/types/types';
import { EntriesTable } from '../../components/entriesTable/entriesTable';
import { TableEntry } from '../../components/entriesTable/tableEntry/tableEntry';
import { SolutionModel } from '../store/dto';

interface SolutionsTableProps {
    solutions: Maybe<SolutionModel[]>;
}

const renderSolutionEntries = (solutions: Maybe<SolutionModel[]>): Maybe<JSX.Element[]> => {
    if (!solutions) {
        return null;
    }

    return solutions.map(({ title, description, content }) => (
        <TableEntry
            renderEntry={() => (
                <div>
                    <div>{title}</div>
                    <div>{description}</div>
                    <div>{content}</div>
                </div>
            )}
            onClickEntry={() => {}}
            onRemoveEntry={async () => {}}
            onEditEntry={() => {}}
        />
    ));
};

export const SolutionsTable: FC<SolutionsTableProps> = ({ solutions }) => {
    return <EntriesTable>{renderSolutionEntries(solutions)}</EntriesTable>;
};
