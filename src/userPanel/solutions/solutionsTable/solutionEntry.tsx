import { FC } from 'react';

interface SolutionEntryProps {
    title: string;
    description: string;
}

export const SolutionEntry: FC<SolutionEntryProps> = ({ title, description }) => (
    <div>
        <div>{title}</div>
        <div>{description}</div>
    </div>
);
