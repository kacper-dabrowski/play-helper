import { FC } from 'react';

interface SolutionEntryProps {
    title: string;
    description: string;
    content: string;
}

export const SolutionEntry: FC<SolutionEntryProps> = ({ title, description, content }) => (
    <div>
        <div>{title}</div>
        <div>{description}</div>
        <div>{content}</div>
    </div>
);
