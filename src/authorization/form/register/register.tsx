import React, { FC } from 'react';
import { useFormik } from 'formik';
import FormInput from '../../../components/Inputs/FormInput/FormInput';
import * as Styled from '../styledAuthForm';
import { StyledFormHeader } from '../../../components/Forms/BaseForm/BaseForm';
import SubmitButton from '../../../components/Buttons/SubmitButton/SubmitButton';
import { signupSchema } from '../../../shared/validation/validation';
import { useErrorNotification } from '../../../hooks/useNotification';
import useFormikError from '../../../hooks/useFormikError';
import { Spinner } from '../../../components/UI/spinner/spinner';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';

export interface RegistrationCredentials {
    username: string;
    password: string;
    fullName: string;
    confirmPassword: string;
}

interface RegistrationFormProps {
    registrationRequest: RequestStatus;
    onRegisterUser: (credentials: RegistrationCredentials) => Promise<void>;
}

export const Register: FC<RegistrationFormProps> = ({ registrationRequest, onRegisterUser }) => {
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
            await onRegisterUser({ username, fullName, password, confirmPassword });
        },
    });

    useErrorNotification(registrationRequest);
    useFormikError(formik.errors);

    return (
        <Styled.AuthForm onSubmit={formik.handleSubmit} data-testid="register-form">
            <StyledFormHeader>Załóż konto</StyledFormHeader>
            <FormInput
                autoFocus
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
