import { Table, Tbody, Thead } from '@chakra-ui/react';
import { FC } from 'react';

interface EntriesTableProps {
    renderTableHeader: () => JSX.Element;
}

export const EntriesTable: FC<EntriesTableProps> = ({ children, renderTableHeader }) => {
    return (
        <Table variant="simple" colorScheme={'purple'}>
            <Thead>{renderTableHeader()}</Thead>
            <Tbody>{children}</Tbody>
        </Table>
    );
};
