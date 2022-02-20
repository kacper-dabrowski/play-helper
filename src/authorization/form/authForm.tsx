import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login, LoginCredentials } from './login/login';
import { Register, RegistrationCredentials } from './register/register';
import * as Styled from './styledAuthForm';
import { SwitchAuthNotice } from './switchAuthNotice/switchAuthNotice';
import { loginUser, registerUser } from '../../stores/auth/auth';
import { StoreState } from '../../stores/store';

export const AuthForm = () => {
    const authStore = useSelector((state: StoreState) => state.auth);
    const dispatch = useDispatch();
    const onLoginUser = async (payload: LoginCredentials): Promise<void> => {
        dispatch(loginUser(payload));
    };

    const onRegisterUser = async (payload: RegistrationCredentials): Promise<void> => {
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
