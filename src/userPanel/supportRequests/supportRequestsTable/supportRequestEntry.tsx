import { Td } from '@chakra-ui/react';
import { FC } from 'react';

interface SupportRequestEntryProps {
    title: string;
    description: string;
    department: string;
}

export const SupportRequestEntry: FC<SupportRequestEntryProps> = ({ title, description, department }) => (
    <>
        <Td>{title}</Td>
        <Td>{description}</Td>
        <Td>{department}</Td>
    </>
);
