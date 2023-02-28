import { useFormik } from 'formik';
import { FC } from 'react';
import { useFormikError } from '../../../hooks/useFormikError';
import { useErrorNotification } from '../../../hooks/useNotification';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { loginSchema } from '../../../shared/validation/validation';
import { LoginForm } from '../../../stories/organisms/form/login';
import styles from './login.module.scss';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginFormProps {
    loginRequest: RequestStatus;
    onLoginUser: (credentials: LoginCredentials) => Promise<void>;
}

export const Login: FC<LoginFormProps> = ({ loginRequest, onLoginUser }) => {
    const formik = useFormik({
        initialValues: { login: '', password: '' },
        onSubmit: async (values) => {
            const { login, password } = values;

            await onLoginUser({
                username: login,
                password,
            });
        },

        validationSchema: loginSchema,
        validateOnChange: false,
    });

    useFormikError(formik.errors);
    useErrorNotification(loginRequest);

    return (
        <LoginForm
            onLoginInput={formik.handleChange}
            onPasswordInput={formik.handleChange}
            onSubmit={formik.handleChange}
            additionalClasses={{ header: styles.header }}
        />
    );
};
