import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { toastProvider } from '../../../libs/toast';
import { createRequestStatus, requestLoading } from '../../../shared/requestStatus/requestStatus';
import { Register } from './register';

jest.mock('../../../components/UI/spinner/spinner', () => ({
    Spinner: () => <div>Loader</div>,
}));

describe('WelcomeBackdrop - Register', () => {
    const onRegisterMock = jest.fn();

    it('should block submit button if form is not touched yet', () => {
        render(getComponentWithProps());

        return waitFor(() => {
            const submitButton = screen.queryByText('Stwórz konto');

            expect(submitButton).toBeDisabled();
        });
    });

    it('should submit form correctly when values are valid', () => {
        render(getComponentWithProps());

        const nameInput = screen.getByPlaceholderText('Nazwa użytkownika');
        const credentialsInput = screen.getByPlaceholderText('Imię i nazwisko');

        const passwordInput = screen.getByPlaceholderText('Hasło');
        const confirmPasswordInput = screen.getByPlaceholderText('Potwierdź hasło');

        userEvent.type(nameInput, 'name');
        userEvent.type(credentialsInput, 'Name Surname');
        userEvent.type(passwordInput, 'password');
        userEvent.type(confirmPasswordInput, 'password');

        fireEvent.submit(screen.getByTestId('register-form'));

        return waitFor(() => {
            expect(onRegisterMock).toHaveBeenCalledWith({
                password: 'password',
                username: 'name',
                fullName: 'Name Surname',
                confirmPassword: 'password',
            });
        });
    });

    it('should display a loader when login request pending', () => {
        render(getComponentWithProps({ ...defaultProps, registrationRequest: requestLoading() }));

        return waitFor(() => {
            expect(screen.queryByText('Loader')).toBeInTheDocument();
        });
    });

    it('should display validation errors, when form is invalid', () => {
        const toastProviderSpy = jest.spyOn(toastProvider, 'error');

        render(getComponentWithProps());

        const nameInput = screen.getByPlaceholderText('Nazwa użytkownika');
        userEvent.type(nameInput, 'name');

        fireEvent.submit(screen.getByTestId('register-form'));

        return waitFor(() => {
            expect(toastProviderSpy).toHaveBeenCalledWith('Pole jest wymagane');
        });
    });

    const defaultProps = {
        onRegisterUser: onRegisterMock,
        registrationRequest: createRequestStatus(),
    };

    function getComponentWithProps(props = defaultProps) {
        return <Register {...props} />;
    }
});
