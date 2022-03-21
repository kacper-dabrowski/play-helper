import React, { FC } from 'react';
import { SpinnerContainer } from './styledSpinner';
import { Spinner as ChakraSpinner } from '@chakra-ui/react';

interface SpinnerProps {
    centered?: boolean;
    size?: number | string;
    color?: string;
}

export const Spinner: FC<SpinnerProps> = ({ centered }) => {
    return (
        <SpinnerContainer isCentered={centered}>
            <ChakraSpinner color="white" />
        </SpinnerContainer>
    );
};
