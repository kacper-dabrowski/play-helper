import { BellIcon, DeleteIcon, EditIcon, LockIcon } from '@chakra-ui/icons';
import { IconButton, Td, Tr } from '@chakra-ui/react';
import { FC, MouseEventHandler } from 'react';

export interface TableEntryProps {
    onRemoveEntry?: () => Promise<void>;
    onEditEntry?: () => void;
    onClickEntry?: MouseEventHandler;
    renderEntry: () => JSX.Element;
    isPublic?: boolean;
}

export const TableEntry: FC<TableEntryProps> = ({
    onClickEntry,
    renderEntry,
    onRemoveEntry,
    onEditEntry,
    isPublic,
}) => (
    <Tr onClick={onClickEntry}>
        {onRemoveEntry && onEditEntry ? (
            <Td textAlign={'center'}>
                <IconButton
                    mr={1}
                    onClick={onEditEntry}
                    colorScheme="purple"
                    icon={<EditIcon />}
                    aria-label={'edit-entry'}
                />
                <IconButton
                    ml={1}
                    onClick={onRemoveEntry}
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    aria-label={'remove-entry'}
                />
            </Td>
        ) : null}
        {isPublic ? (
            <Td textAlign={'center'}>
                <BellIcon />
            </Td>
        ) : (
            <Td textAlign={'center'}>
                <LockIcon />
            </Td>
        )}

        {renderEntry()}
    </Tr>
);
