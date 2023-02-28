import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as Styled from '../styledAuthForm';
import { StyledFormHeader } from '../../../components/Forms/BaseForm/BaseForm';
import { signupSchema } from '../../../shared/validation/validation';
import { useErrorNotification } from '../../../hooks/useNotification';
import { useFormikError } from '../../../hooks/useFormikError';
import { Spinner } from '../../../components/UI/spinner/spinner';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { Input } from '../../../stories/atoms/input/input';
import { Button, ButtonVariant } from '../../../stories/atoms/button/button';

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
                <Button title="Stwórz konto" disabled={!formik.dirty} variant={ButtonVariant.Submit} type="submit" />
            )}
        </Styled.AuthForm>
    );
};
