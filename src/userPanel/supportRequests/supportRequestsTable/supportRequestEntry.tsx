import { FC } from 'react';

interface SupportRequestEntryProps {
    title: string;
    description: string;
    content: string;
    department: string;
}

export const SupportRequestEntry: FC<SupportRequestEntryProps> = ({ title, description, content, department }) => (
    <div>
        <div>{title}</div>
        <div>{description}</div>
        <div>{content}</div>
        <div>{department}</div>
    </div>
);
