import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import cogoToast from 'cogo-toast';
import { Login } from './Login';
import { RequestStatus } from '../../../../../shared/requestStatus/requestStatus.ts';

jest.mock('../../../Spinner/Spinner', () => ({
    __esModule: true,
    default: () => <div>Loader</div>,
}));

const onLoginUserMock = jest.fn();

const defaultProps = {
    onLoginUser: onLoginUserMock,
    loginRequest: new RequestStatus(),
};

function getComponentWithProps(props = defaultProps) {
    return <Login {...props} />;
}

describe('WelcomeBackdrop - Login', () => {
    it('should block submit button if form is not touched yet', () => {
        render(getComponentWithProps());

        return waitFor(() => {
            const [, submitButton] = screen.queryAllByText('Zaloguj się');

            expect(submitButton).toBeDisabled();
        });
    });

    it('should submit form correctly when values are valid', () => {
        render(getComponentWithProps());
        const nameInput = screen.getByPlaceholderText('Nazwa użytkownika');
        const passwordInput = screen.getByPlaceholderText('Hasło');

        userEvent.type(nameInput, 'name');
        userEvent.type(passwordInput, 'password');

        fireEvent.submit(screen.getByTestId('login-form'));

        return waitFor(() => {
            expect(onLoginUserMock).toHaveBeenCalledWith({ password: 'password', username: 'name' });
        });
    });

    it('should display a loader when login request pending', () => {
        render(getComponentWithProps({ ...defaultProps, loginRequest: { loading: true } }));

        return waitFor(() => {
            expect(screen.queryByText('Loader')).toBeInTheDocument();
        });
    });

    it('should display validation errors, when form is invalid', () => {
        const cogoToastSpy = jest.spyOn(cogoToast, 'error');

        render(getComponentWithProps());

        const nameInput = screen.getByPlaceholderText('Nazwa użytkownika');
        userEvent.type(nameInput, 'name');

        fireEvent.submit(screen.getByTestId('login-form'));

        return waitFor(() => {
            expect(cogoToastSpy).toHaveBeenCalledWith('Pole jest wymagane');
        });
    });
});
