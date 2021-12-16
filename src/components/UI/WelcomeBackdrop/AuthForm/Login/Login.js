import React from 'react';
import { useFormik } from 'formik';
import FormInput from '../../../../Inputs/FormInput/FormInput';
import { StyledFormHeader } from '../../../../Forms/BaseForm/BaseForm';
import SubmitButton from '../../../../Buttons/SubmitButton/SubmitButton';
import { loginSchema } from '../../../../../shared/validation/validation';
import useFormikError from '../../../../../hooks/useFormikError';
import useFocus from '../../../../../hooks/useFocus';
import * as Styled from '../StyledAuthForm';
import Spinner from '../../../Spinner/Spinner';

export const Login = ({ loginRequest, onLoginUser }) => {
    const focusRef = useFocus();
    const formik = useFormik({
        initialValues: { login: '', password: '' },
        onSubmit: (values) => {
            const { login, password } = values;

            onLoginUser({
                username: login,
                password,
            });
        },

        validationSchema: loginSchema,
        validateOnChange: false,
    });

    useFormikError(formik.errors);

    return (
        <Styled.AuthForm onSubmit={formik.handleSubmit} data-testid="login-form">
            <StyledFormHeader>Zaloguj się</StyledFormHeader>
            <FormInput
                focusRef={focusRef}
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
