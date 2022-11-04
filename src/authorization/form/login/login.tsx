import React, { FC } from 'react';
import { useFormik } from 'formik';
import { StyledFormHeader } from '../../../components/Forms/BaseForm/BaseForm';
import { SubmitButton } from '../../../components/Buttons/SubmitButton/SubmitButton';
import { loginSchema } from '../../../shared/validation/validation';
import { useFormikError } from '../../../hooks/useFormikError';
import { useErrorNotification } from '../../../hooks/useNotification';
import * as Styled from '../styledAuthForm';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { Spinner } from '../../../components/UI/spinner/spinner';
import { Input } from '../../../stories/atoms/input/input';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginFormProps {
    loginRequest: RequestStatus;
    onLoginUser: (credentials: LoginCredentials) => Promise<void>;
}
export const Login: FC<LoginFormProps> = ({ loginRequest, onLoginUser }) => {
    const formik = useFormik({
        initialValues: { login: '', password: '' },
        onSubmit: async (values) => {
            const { login, password } = values;

            await onLoginUser({
                username: login,
                password,
            });
        },

        validationSchema: loginSchema,
        validateOnChange: false,
    });

    useFormikError(formik.errors);
    useErrorNotification(loginRequest);

    return (
        <Styled.AuthForm onSubmit={formik.handleSubmit} data-testid="login-form">
            <StyledFormHeader>Zaloguj się</StyledFormHeader>
            <Input
                autoFocus
                id="login"
                name="login"
                error={formik.errors.login}
                onChange={formik.handleChange}
                value={formik.values.login}
                type="text"
                placeholder="Nazwa użytkownika"
            />
            <Input
                id="password"
                name="password"
                error={formik.errors.password}
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                placeholder="Hasło"
            />
            {loginRequest.loading ? (
                <Spinner />
            ) : (
                <SubmitButton title="Zaloguj się" onClick={formik.handleSubmit} disabled={!formik.dirty} />
            )}
        </Styled.AuthForm>
    );
};
