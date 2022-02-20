import SyncLoader from 'react-spinners/SyncLoader';
import React, { FC } from 'react';
import { SpinnerContainer } from './styledSpinner';

interface SpinnerProps {
    centered?: boolean;
    size?: number | string;
    color?: string;
}

export const Spinner: FC<SpinnerProps> = ({ centered, size, color }) => {
    return (
        <SpinnerContainer isCentered={centered}>
            <SyncLoader color={color || 'white'} size={size} />
        </SpinnerContainer>
    );
};
