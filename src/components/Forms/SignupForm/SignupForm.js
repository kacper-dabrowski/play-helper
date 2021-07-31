import cogoToast from 'cogo-toast';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useError from '../../../hooks/useError';
import useFocus from '../../../hooks/useFocus';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import urls from '../../../shared/urls';
import { signupSchema } from '../../../shared/validation/validation';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import Spinner from '../../UI/Spinner/Spinner';
import { auth } from '../../../stores/auth/auth';
import { StyledBaseForm, StyledFormHeader, TwoColumnFormLayout } from '../BaseForm/BaseForm';
import FormInput from '../../Inputs/FormInput/FormInput';

const SignUpForm = ({ closeModalHandler }) => {
    const dispatch = useDispatch();
    const { requestHandler, error, loading, response } = useRequest(urls.signup, REQUEST_METHODS.POST);
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
            const { username, password, fullName } = values;

            try {
                await requestHandler({ username, password, fullName }, () => urls.signup);

                if (error) {
                    throw new Error(error.message);
                }

                if (response) {
                    return dispatch(auth(username, password, closeModalHandler));
                }
            } catch (requestError) {
                cogoToast.error(requestError.message);
            }
        },
    });
    useEffect(() => {
        if (error) {
            cogoToast.error(error.message);
        }
    }, [error]);
    useError(formik.errors);

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
            {loading ? <Spinner centered /> : <SubmitButton title="Utwórz konto" />}
        </StyledBaseForm>
    );
};

export default SignUpForm;
