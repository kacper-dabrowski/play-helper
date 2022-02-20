import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import * as Styled from './StyledWelcomeBackdrop';
import { AuthForm } from '../../../authorization/form/authForm';

export const WelcomeBackdrop = ({ isOpened }) => {
    return isOpened ? (
        <>
            <Backdrop isOpened />
            <Styled.Container>
                <Styled.Header>Witaj</Styled.Header>
                <Styled.Subheader>Zaloguj się lub stwórz konto, aby skorzystać z aplikacji.</Styled.Subheader>
                <AuthForm />
            </Styled.Container>
        </>
    ) : null;
};
