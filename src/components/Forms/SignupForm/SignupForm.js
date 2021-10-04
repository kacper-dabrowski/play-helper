import cogoToast from 'cogo-toast';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import useFormikError from '../../../hooks/useFormikError';
import useFocus from '../../../hooks/useFocus';
import { signupSchema } from '../../../shared/validation/validation';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import Spinner from '../../UI/Spinner/Spinner';
import { StyledBaseForm, StyledFormHeader, TwoColumnFormLayout } from '../BaseForm/BaseForm';
import FormInput from '../../Inputs/FormInput/FormInput';

const SignUpForm = ({ closeModalHandler, onRegisterUser, requestStatus }) => {
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
            const { username, fullName, password } = values;
            onRegisterUser({ username, fullName, password, onSuccess: closeModalHandler });
        },
    });

    useEffect(() => {
        if (requestStatus.error) {
            cogoToast.error(requestStatus.error);
        }
    }, [requestStatus]);
    useFormikError(formik.errors);

    return (
        <StyledBaseForm onSubmit={formik.handleSubmit}>
            <StyledFormHeader>Zarejestruj się</StyledFormHeader>
            <TwoColumnFormLayout>
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
            </TwoColumnFormLayout>
            {requestStatus.loading ? <Spinner centered /> : <SubmitButton title="Utwórz konto" />}
        </StyledBaseForm>
    );
};

export default SignUpForm;
