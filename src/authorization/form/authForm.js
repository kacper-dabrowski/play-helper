import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from './login/login';
import { Register } from './register/register';
import * as Styled from './styledAuthForm';
import { SwitchAuthNotice } from './switchAuthNotice/switchAuthNotice';
import { loginUser, registerUser } from '../../stores/auth/auth';

export const AuthForm = () => {
    const authStore = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const onLoginUser = (payload) => {
        dispatch(loginUser(payload));
    };

    const onRegisterUser = (payload) => {
        dispatch(registerUser(payload));
    };

    const [isLogin, setIsLogin] = useState(true);

    return (
        <Styled.Wrapper>
            <Styled.Container>
                {isLogin ? (
                    <Login loginRequest={authStore.loginRequest} onLoginUser={onLoginUser} />
                ) : (
                    <Register onRegisterUser={onRegisterUser} registrationRequest={authStore.registrationRequest} />
                )}
                <SwitchAuthNotice isLogin={isLogin} setIsLogin={setIsLogin} />
            </Styled.Container>
        </Styled.Wrapper>
    );
};
