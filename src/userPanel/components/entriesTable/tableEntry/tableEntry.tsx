import { FC, MouseEventHandler } from 'react';
import * as Styles from './styledTableEntry';
import crossIcon from '../../../../assets/icons/cancel.svg';
import pencilIcon from '../../../../assets/icons/pencil.png';
import globeIcon from '../../../../assets/icons/planet-earth.svg';

export interface TableEntryProps {
    onRemoveEntry?: () => Promise<void>;
    onEditEntry?: () => void;
    onClickEntry?: MouseEventHandler;
    renderEntry: () => JSX.Element;
    displayGlobeIcon?: boolean;
}

export const TableEntry: FC<TableEntryProps> = ({
    onClickEntry,
    renderEntry,
    onRemoveEntry,
    onEditEntry,
    displayGlobeIcon,
}) => (
    <Styles.tableEntryContainer onClick={onClickEntry}>
        {onRemoveEntry && onEditEntry ? (
            <Styles.controlsContainer data-testid="table-entry">
                <Styles.iconButton
                    data-testid="on-remove-entry"
                    src={crossIcon}
                    onClick={onRemoveEntry}
                    title={'Usuń wybraną pozycję'}
                />
                <Styles.iconButton
                    data-testid="on-edit-entry"
                    src={pencilIcon}
                    onClick={onEditEntry}
                    title={'Edytuj wybraną pozycję'}
                />
            </Styles.controlsContainer>
        ) : null}
        {displayGlobeIcon ? (
            <Styles.publicIconContainer>
                <Styles.iconButton data-testid="icon-global" src={globeIcon} />
            </Styles.publicIconContainer>
        ) : null}

        <div>{renderEntry()}</div>
    </Styles.tableEntryContainer>
);
