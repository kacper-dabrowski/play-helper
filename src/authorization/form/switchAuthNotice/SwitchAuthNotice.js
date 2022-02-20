import React from 'react';
import * as Styled from './StyledSwitchAuthNotice';

export const SwitchAuthNotice = ({ isLogin, setIsLogin }) => {
    const notice = isLogin ? (
        <>
            <Styled.Text>Nie masz konta?</Styled.Text>
            <Styled.Button onClick={() => setIsLogin(false)} type="button">
                Załóż je!
            </Styled.Button>
        </>
    ) : (
        <>
            <Styled.Text>Masz już konto?</Styled.Text>
            <Styled.Button onClick={() => setIsLogin(true)} type="button">
                Zaloguj się!
            </Styled.Button>
        </>
    );

    return <Styled.Container>{notice}</Styled.Container>;
};
