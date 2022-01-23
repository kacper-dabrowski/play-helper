import React, { FC } from 'react';
import Basic from './Basic';

export interface BasicContainerProps {
    name: string;
}
export const BasicContainer: FC<BasicContainerProps> = ({ name }) => {
    return <Basic name={name} />;
};
