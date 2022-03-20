import { FC } from 'react';

interface SupportRequestEntryProps {
    title: string;
    description: string;
    department: string;
}

export const SupportRequestEntry: FC<SupportRequestEntryProps> = ({ title, description, department }) => (
    <div>
        <div>{title}</div>
        <div>{description}</div>
        <div>{department}</div>
    </div>
);
