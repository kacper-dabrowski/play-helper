import React from 'react';
import { StyledErrorMessage, ErrorMessageContainer } from './StyledErrorMessage';

const ErrorMessage = ({ message }) => {
    return (
        <ErrorMessageContainer>
            <StyledErrorMessage>{message}</StyledErrorMessage>
        </ErrorMessageContainer>
    );
};

export default ErrorMessage;
