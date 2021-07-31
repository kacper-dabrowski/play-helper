import cogoToast from 'cogo-toast';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useError from '../../../hooks/useError';
import useFocus from '../../../hooks/useFocus';
import { loginSchema } from '../../../shared/validation/validation';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import Spinner from '../../UI/Spinner/Spinner';
import LoginInput from './LoginInputs/LoginInput/LoginInput';
import { LoginInputsWrapper } from './LoginInputs/StyledLoginInputs';
import { auth } from '../../../stores/auth/auth';
import { StyledBaseForm, StyledFormHeader } from '../BaseForm/BaseForm';

const LoginForm = ({ onSuccess }) => {
    const error = useSelector((state) => state.auth.error);
    const isLoading = useSelector((state) => state.auth.loading);

    const dispatch = useDispatch();
    const focusRef = useFocus();

    const formik = useFormik({
        initialValues: { login: '', password: '' },
        onSubmit: (values) => {
            const { login, password } = values;

            dispatch(
                auth(login, password, () => {
                    onSuccess();
                    cogoToast.success('Zalogowano pomyślnie');
                })
            );
        },

        validationSchema: loginSchema,
        validateOnChange: false,
    });

    useError(formik.errors);
    useEffect(() => {
        if (error) {
            cogoToast.error(error);
        }
    }, [error]);

    return (
        <StyledBaseForm onSubmit={formik.handleSubmit}>
            <StyledFormHeader>Zaloguj się</StyledFormHeader>
            <LoginInputsWrapper>
                <LoginInput
                    focusRef={focusRef}
                    id="login"
                    name="login"
                    hasErrors={!!formik.errors.login && !!formik.touched.login}
                    onChange={formik.handleChange}
                    value={formik.values.login}
                    type="text"
                    placeholder="Nazwa użytkownika"
                />
                <LoginInput
                    id="password"
                    name="password"
                    hasErrors={!!formik.errors.password && !!formik.touched.password}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type="password"
                    placeholder="Hasło"
                />
            </LoginInputsWrapper>
            {isLoading ? <Spinner centered /> : <SubmitButton title="Zaloguj się" />}
        </StyledBaseForm>
    );
};

export default LoginForm;
