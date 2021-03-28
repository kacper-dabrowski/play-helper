import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormInputsWrapper, StyledSignupForm } from './StyledSignupForm';
import LoginInput from '../LoginForm/LoginInputs/LoginInput/LoginInput';
import * as actions from '../../../store/actions';
import urls from '../../../shared/urls';
import axios from '../../../libs/axios';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { StyledFormHeader } from '../../UI/Headers/StyledHeaders';
import ErrorBadge from '../../UI/ErrorBadge/ErrorBadge';
import { getLastMessageFromFormikErrors } from '../../../shared/errors/handleErrors';
import useFocus from '../../../hooks/useFocus';

const validationSchema = Yup.object({
    username: Yup.string().max(20, 'Pole musi być krótsze niz 20 znaków').required('Pole jest wymagane'),
    fullName: Yup.string().required('Pole jest wymagane'),
    password: Yup.string().min(6, 'Hasło musi być dłuzsze niz 6 znakow').required('Pole jest wymagane'),
    confirmPassword: Yup.string()
        .required('Pole jest wymagane')
        .oneOf([Yup.ref('password'), null], 'Hasła muszą się zgadzać'),
});

const SignUpForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const focusRef = useFocus();

    const formik = useFormik({
        initialValues: {
            username: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const { username, password, fullName } = values;
            try {
                setIsLoading(true);
                const signupRequest = await axios.post(urls.signup, {
                    username,
                    password,
                    fullName,
                });
                if (signupRequest.status === 201) {
                    props.onAuth(username, password, props.closeModalHandler);
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setSubmitError(error);
            }
        },
    });
    const error = submitError && <ErrorMessage message="Ta nazwa użytkownika jest już zajęta" />;
    return (
        <StyledSignupForm onSubmit={formik.handleSubmit}>
            <StyledFormHeader>Zarejestruj się</StyledFormHeader>
            <ErrorBadge message={getLastMessageFromFormikErrors(formik.errors)} />
            {error}
            <FormInputsWrapper>
                <LoginInput
                    focusRef={focusRef}
                    name="username"
                    id="username"
                    hasErrors={!!formik.errors.username && !!formik.touched.username}
                    placeholder="Nazwa użytkownika"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <LoginInput
                    name="fullName"
                    id="fullName"
                    hasErrors={!!formik.errors.fullName && !!formik.touched.fullName}
                    placeholder="Imię i nazwisko"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                />
                <LoginInput
                    name="password"
                    id="password"
                    hasErrors={!!formik.errors.password && !!formik.touched.password}
                    placeholder="Hasło"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <LoginInput
                    name="confirmPassword"
                    id="confirmPassword"
                    hasErrors={!!formik.errors.confirmPassword && !!formik.touched.confirmPassword}
                    placeholder="Potwierdź hasło"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                />
            </FormInputsWrapper>
            {isLoading ? <Spinner centered /> : <SubmitButton title="Utwórz konto" />}
        </StyledSignupForm>
    );
};

const mapDispatchToProps = (dispatch) => ({
    onAuth: (login, password, onSuccess) => dispatch(actions.auth(login, password, onSuccess)),
});

const mapStateToProps = (state) => ({
    isLoading: state.auth.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
