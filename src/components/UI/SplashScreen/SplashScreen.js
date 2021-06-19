import React from 'react';
import { Container } from './StyledSplashScreen';
import Spinner from '../Spinner/Spinner';
import { StyledFormHeader } from '../Headers/StyledHeaders';

export const SplashScreen = () => {
    return (
        <Container>
            <StyledFormHeader>Aplikacja jest w trakcie ładowania...</StyledFormHeader>
            <Spinner centered color="white" />
        </Container>
    );
};
