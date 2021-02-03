import { ClipLoader } from 'react-spinners';
import React from 'react';
import { SpinnerContainer } from './StyledSpinner';

const Spinner = ({ centered, size }) => {
    return (
        <SpinnerContainer isCentered={centered}>
            <ClipLoader color="white" size={size} />
        </SpinnerContainer>
    );
};

export default Spinner;
