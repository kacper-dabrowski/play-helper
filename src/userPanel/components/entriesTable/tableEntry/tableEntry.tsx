import { FC, MouseEventHandler } from 'react';
import * as Styles from './styledTableEntry';
import crossIcon from '../../../../assets/icons/cancel.svg';
import pencilIcon from '../../../../assets/icons/pencil.png';

interface TableEntryProps {
    onRemoveEntry?: () => Promise<void>;
    onEditEntry?: () => void;
    onClickEntry: MouseEventHandler;
    renderEntry: () => JSX.Element;
}

export const TableEntry: FC<TableEntryProps> = ({ onClickEntry, renderEntry, onRemoveEntry, onEditEntry }) => (
    <Styles.tableEntryContainer onClick={onClickEntry}>
        {onRemoveEntry && onEditEntry ? (
            <Styles.controlsContainer>
                <Styles.iconButton src={crossIcon} onClick={onRemoveEntry} title={'Usuń wybraną pozycję'} />
                <Styles.iconButton src={pencilIcon} onClick={onEditEntry} title={'Edytuj wybraną pozycję'} />
            </Styles.controlsContainer>
        ) : null}

        <div>{renderEntry()}</div>
    </Styles.tableEntryContainer>
);
