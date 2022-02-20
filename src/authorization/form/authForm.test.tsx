import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../stores/store';
import { AuthForm } from './authForm';

describe('WelcomeBackdrop - AuthForm', () => {
    let fakeStore: typeof store;

    beforeEach(() => {
        fakeStore = store;
    });

    it('should render login form initially', () => {
        render(getComponentWithStores());

        const [header] = screen.getAllByText('Zaloguj się');

        expect(header).toBeInTheDocument();
    });

    it('should switch form to registration when clicked', () => {
        render(getComponentWithStores());

        const switchAuthButton = screen.getByText('Załóż je!');

        userEvent.click(switchAuthButton);

        return waitFor(() => {
            expect(screen.queryByText('Załóż konto')).toBeInTheDocument();
        });
    });

    it('should switch back to login form from registration form when clicked', async () => {
        render(getComponentWithStores());

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

    function getComponentWithStores() {
        return (
            <Provider store={fakeStore}>
                <AuthForm />
            </Provider>
        );
    }
});
