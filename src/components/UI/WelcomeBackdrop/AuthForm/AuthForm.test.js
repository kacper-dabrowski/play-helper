import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { useStore } from '../../../../hooks/useStore';
import { createRequestStatus } from '../../../../shared/requestStatus/requestStatus';
import { AuthForm } from './AuthForm';

const defaultRequestStatus = createRequestStatus();

jest.mock('../../../../hooks/useStore', () => ({
    useStore: jest.fn(),
}));

describe('WelcomeBackdrop - AuthForm', () => {
    it('should render login form initially', () => {
        useStore.mockImplementation(() => ({
            authStore: {
                loginRequest: defaultRequestStatus,
                registrationRequest: defaultRequestStatus,
            },
            dispatch: () => jest.fn(),
        }));

        render(<AuthForm />);

        const [header] = screen.getAllByText('Zaloguj się');

        expect(header).toBeInTheDocument();
    });

    it('should switch form to registration when clicked', () => {
        useStore.mockImplementation(() => ({
            authStore: {
                loginRequest: defaultRequestStatus,
                registrationRequest: defaultRequestStatus,
            },
            dispatch: () => jest.fn(),
        }));

        render(<AuthForm />);

        const switchAuthButton = screen.getByText('Załóż je!');

        userEvent.click(switchAuthButton);

        return waitFor(() => {
            expect(screen.queryByText('Załóż konto')).toBeInTheDocument();
        });
    });

    it('should switch back to login form from registration form when clicked', async () => {
        useStore.mockImplementation(() => ({
            authStore: {
                loginRequest: defaultRequestStatus,
                registrationRequest: defaultRequestStatus,
            },
            dispatch: () => jest.fn(),
        }));

        render(<AuthForm />);

        const switchAuthButton = screen.getByText('Załóż je!');

        userEvent.click(switchAuthButton);

        await waitFor(() => {
            expect(screen.queryByText('Załóż konto')).toBeInTheDocument();
        });

        userEvent.click(screen.getByText('Zaloguj się!'));

        return waitFor(() => {
            const [header] = screen.queryAllByText('Zaloguj się');

            expect(header).toBeInTheDocument();
        });
    });
});
