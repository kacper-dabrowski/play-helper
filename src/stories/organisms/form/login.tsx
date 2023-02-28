import classNames from 'classnames';
import { FC } from 'react';
import { Button, ButtonVariant } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import styles from './form.module.scss';

export const LoginForm: FC<LoginFormProps> = ({
    onLoginInput,
    onPasswordInput,
    onSubmit,
    loading,
    additionalClasses = {},
    errors,
}) => {
    const formClasses = classNames(styles.form, additionalClasses.form);
    const headerClasses = classNames(styles.header, additionalClasses.header);
    const buttonClasses = classNames(styles.button, additionalClasses.button);

    return (
        <form onSubmit={onSubmit} className={formClasses}>
            <h1 className={headerClasses}>Logowanie</h1>
            <Input
                labelText="nazwa użytkownika"
                placeholder="jkowalski"
                onChange={onLoginInput}
                additionalClasses={{ inputs: additionalClasses.inputs }}
                name={'username'}
                type={'text'}
                error={errors?.username}
            />
            <Input
                labelText="hasło"
                placeholder="twoje hasło"
                onChange={onPasswordInput}
                additionalClasses={{ input: additionalClasses.inputs }}
                name={'password'}
                type="password"
                error={errors?.password}
            />
            <Button additionalClasses={buttonClasses} variant={ButtonVariant.Submit} type="submit" loading={loading}>
                zaloguj się
            </Button>
        </form>
    );
};

export interface LoginFormProps {
    onLoginInput: React.ChangeEventHandler<HTMLInputElement>;
    onPasswordInput: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    errors?: {
        username: string;
        password: string;
    };
    loading?: boolean;
    additionalClasses?: {
        header?: string;
        form?: string;
        button?: string;
        inputs?: string;
    };
}

{
    /* <Styled.AuthForm onSubmit={formik.handleSubmit} data-testid="login-form">
    <StyledFormHeader>Zaloguj się</StyledFormHeader>
    <Input
        autoFocus
        id="login"
        name="login"
        error={formik.errors.login}
        onChange={formik.handleChange}
        value={formik.values.login}
        type="text"
        placeholder="Nazwa użytkownika"
    />
    <Input
        id="password"
        name="password"
        error={formik.errors.password}
        onChange={formik.handleChange}
        value={formik.values.password}
        type="password"
        placeholder="Hasło"
    />
    {loginRequest.loading ? (
        <Spinner />
    ) : (
        <Button type="submit" disabled={!formik.dirty} variant={ButtonVariant.Submit}>
            Zaloguj się
        </Button>
    )}
</Styled.AuthForm>; */
}
