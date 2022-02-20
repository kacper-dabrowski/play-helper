import React, { FC } from 'react';
import { useFormik } from 'formik';
import FormInput from '../../../components/Inputs/FormInput/FormInput';
import { StyledFormHeader } from '../../../components/Forms/BaseForm/BaseForm';
import SubmitButton from '../../../components/Buttons/SubmitButton/SubmitButton';
import { loginSchema } from '../../../shared/validation/validation';
import useFormikError from '../../../hooks/useFormikError';
import { useErrorNotification } from '../../../hooks/useNotification';
import * as Styled from '../styledAuthForm';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { Spinner } from '../../../components/UI/spinner/spinner';

interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginFormProps {
    loginRequest: RequestStatus;
    onLoginUser: (credentials: LoginPayload) => Promise<void>;
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
            <FormInput
                autoFocus
                id="login"
                name="login"
                hasErrors={!!formik.errors.login && !!formik.touched.login}
                onChange={formik.handleChange}
                value={formik.values.login}
                type="text"
                placeholder="Nazwa użytkownika"
            />
            <FormInput
                id="password"
                name="password"
                hasErrors={!!formik.errors.password && !!formik.touched.password}
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
