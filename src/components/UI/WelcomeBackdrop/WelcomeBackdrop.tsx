import React, { FC } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import * as Styled from './StyledWelcomeBackdrop';
import { AuthForm } from '../../../authorization/form/authForm';

interface WelcomeBackdropProps {
    isOpened: boolean;
}

export const WelcomeBackdrop: FC<WelcomeBackdropProps> = ({ isOpened }) => {
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
