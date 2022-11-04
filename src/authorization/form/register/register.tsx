import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Styled from '../styledAuthForm';
import { StyledFormHeader } from '../../../components/Forms/BaseForm/BaseForm';
import { SubmitButton } from '../../../components/Buttons/SubmitButton/SubmitButton';
import { signupSchema } from '../../../shared/validation/validation';
import { useErrorNotification } from '../../../hooks/useNotification';
import { useFormikError } from '../../../hooks/useFormikError';
import { Spinner } from '../../../components/UI/spinner/spinner';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { Input } from '../../../stories/atoms/input/input';

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
            <Input
                autoFocus
                name="username"
                id="username"
                error={formik.errors.username}
                placeholder="Nazwa użytkownika"
                onChange={formik.handleChange}
                value={formik.values.username}
            />
            <Input
                name="fullName"
                id="fullName"
                error={formik.errors.fullName}
                placeholder="Imię i nazwisko"
                onChange={formik.handleChange}
                value={formik.values.fullName}
            />
            <Styled.BreakRow />
            <Input
                name="password"
                id="password"
                error={formik.errors.password}
                placeholder="Hasło"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <Input
                name="confirmPassword"
                id="confirmPassword"
                error={formik.errors.confirmPassword}
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
