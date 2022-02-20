import React from 'react';
import { useFormik } from 'formik';
import FormInput from '../../../components/Inputs/FormInput/FormInput';
import * as Styled from '../styledAuthForm';
import { StyledFormHeader } from '../../../components/Forms/BaseForm/BaseForm';
import SubmitButton from '../../../components/Buttons/SubmitButton/SubmitButton';
import useFocus from '../../../hooks/useFocus';
import { signupSchema } from '../../../shared/validation/validation';
import { useErrorNotification } from '../../../hooks/useNotification';
import useFormikError from '../../../hooks/useFormikError';
import Spinner from '../../../components/UI/Spinner/Spinner';

export const Register = ({ registrationRequest, onRegisterUser }) => {
    const focusRef = useFocus();

    const formik = useFormik({
        initialValues: {
            username: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: signupSchema,
        validateOnChange: false,
        onSubmit: async (values) => {
            const { username, fullName, password, confirmPassword } = values;
            onRegisterUser({ username, fullName, password, confirmPassword });
        },
    });

    useErrorNotification(registrationRequest);
    useFormikError(formik.errors);

    return (
        <Styled.AuthForm onSubmit={formik.handleSubmit} data-testid="register-form">
            <StyledFormHeader>Załóż konto</StyledFormHeader>
            <FormInput
                focusRef={focusRef}
                name="username"
                id="username"
                hasErrors={!!formik.errors.username && !!formik.touched.username}
                placeholder="Nazwa użytkownika"
                onChange={formik.handleChange}
                value={formik.values.username}
            />
            <FormInput
                name="fullName"
                id="fullName"
                hasErrors={!!formik.errors.fullName && !!formik.touched.fullName}
                placeholder="Imię i nazwisko"
                onChange={formik.handleChange}
                value={formik.values.fullName}
            />
            <Styled.BreakRow />
            <FormInput
                name="password"
                id="password"
                hasErrors={!!formik.errors.password && !!formik.touched.password}
                placeholder="Hasło"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <FormInput
                name="confirmPassword"
                id="confirmPassword"
                hasErrors={!!formik.errors.confirmPassword && !!formik.touched.confirmPassword}
                placeholder="Potwierdź hasło"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
            />
            {registrationRequest.loading ? (
                <Spinner />
            ) : (
                <SubmitButton title="Stwórz konto" onClick={formik.handleSubmit} disabled={!formik.dirty} />
            )}
        </Styled.AuthForm>
    );
};