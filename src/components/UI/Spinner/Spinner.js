import SyncLoader from 'react-spinners/SyncLoader';
import React from 'react';
import { SpinnerContainer } from './StyledSpinner';

const Spinner = ({ centered, size, color }) => {
    return (
        <SpinnerContainer isCentered={centered}>
            <SyncLoader color={color || 'white'} size={size} />
        </SpinnerContainer>
    );
};

export default Spinner;
