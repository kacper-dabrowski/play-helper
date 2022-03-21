import { Td } from '@chakra-ui/react';
import { FC } from 'react';

interface SolutionEntryProps {
    title: string;
    description: string;
}

export const SolutionEntry: FC<SolutionEntryProps> = ({ title, description }) => (
    <>
        <Td>{title}</Td>
        <Td>{description}</Td>
    </>
);
