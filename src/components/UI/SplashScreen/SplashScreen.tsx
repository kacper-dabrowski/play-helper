import React, { FC } from 'react';
import { Container } from './StyledSplashScreen';
import { Spinner } from '../spinner/spinner';
import { StyledFormHeader } from '../../Forms/BaseForm/BaseForm';

export const SplashScreen: FC = () => {
    return (
        <Container>
            <StyledFormHeader>Aplikacja jest w trakcie ładowania...</StyledFormHeader>
            <Spinner centered color="white" />
        </Container>
    );
};
