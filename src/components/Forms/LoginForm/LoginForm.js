import cogoToast from 'cogo-toast';
import { useFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import useError from '../../../hooks/useError';
import useFocus from '../../../hooks/useFocus';
import * as actions from '../../../store/actions';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import { StyledFormHeader } from '../../UI/Headers/StyledHeaders';
import Spinner from '../../UI/Spinner/Spinner';
import LoginInput from './LoginInputs/LoginInput/LoginInput';
import { LoginInputsWrapper } from './LoginInputs/StyledLoginInputs';
import { StyledLoginForm } from './StyledLoginForm';

const validationSchema = Yup.object({
    login: Yup.string().max(20, 'Login musi być nie dłuzszy niz 20 znaków').required('Pole jest wymagane'),
    password: Yup.string().min(6, 'Hasło nie może być krótsze niż 6 znaków').required('Pole jest wymagane'),
});

const LoginForm = (props) => {
    const formik = useFormik({
        initialValues: { login: '', password: '' },
        onSubmit: (values) =>
            props.onAuth(values.login, values.password, () => {
                props.onSuccess();
                cogoToast.success('Zalogowano pomyślnie');
            }),
        validationSchema,
        validateOnChange: false,
    });

    const focusRef = useFocus();

    useError(formik.errors, props.error);

    return (
        <>
            <StyledLoginForm onSubmit={formik.handleSubmit}>
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
                {props.isLoading ? <Spinner centered /> : <SubmitButton title="Zaloguj się" />}
            </StyledLoginForm>
        </>
    );
};
const mapDispatchToProps = (dispatch) => ({
    onAuth: (login, password, onSuccess) => dispatch(actions.auth(login, password, onSuccess)),
});

const mapStateToProps = (state) => ({
    isLoading: state.auth.loading,
    error: state.auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
