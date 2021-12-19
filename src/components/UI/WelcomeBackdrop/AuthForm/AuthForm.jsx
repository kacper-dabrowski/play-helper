import React, { useState } from 'react';
import { useStore } from '../../../../stores/stores';
import { Login } from './Login/Login';
import { Register } from './Register/Register';
import * as Styled from './StyledAuthForm';
import { SwitchAuthNotice } from './SwitchAuthNotice/SwitchAuthNotice';

export const AuthForm = () => {
    const { authStore } = useStore();

    const [isLogin, setIsLogin] = useState(true);

    return (
        <Styled.Wrapper>
            <Styled.Container>
                {isLogin ? (
                    <Login loginRequest={authStore.loginRequest} onLoginUser={authStore.login} />
                ) : (
                    <Register onRegisterUser={authStore.register} registrationRequest={authStore.registrationRequest} />
                )}
                <SwitchAuthNotice isLogin={isLogin} setIsLogin={setIsLogin} />
            </Styled.Container>
        </Styled.Wrapper>
    );
};
