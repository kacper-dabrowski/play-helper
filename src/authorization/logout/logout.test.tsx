import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Logout } from './logout';
import authSlice from '../store/authSlice';
import { toastProvider } from '../../libs/toast';
import * as auth from '../store/auth';

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

describe('authorization - logout', () => {
    let testStore: typeof store;

    beforeEach(() => {
        testStore = configureStore({
            reducer: {
                auth: authSlice,
            },
        });
    });

    it('should logout a user and redirect to home page, if component is mounted', () => {
        const logoutSpy = jest.spyOn(auth, 'logout');

        renderComponent();

        userEvent.click(screen.getByText('Testing path'));

        expect(screen.queryByText('Logged out!')).not.toBeInTheDocument();

        userEvent.click(screen.getByText('Log out'));

        expect(screen.getByText('Logged out!')).toBeInTheDocument();
        expect(logoutSpy).toHaveBeenCalled();
    });

    function renderComponent() {
        return render(
            <MemoryRouter>
                <Provider store={testStore}>
                    <Link to="/testing-path">Testing path</Link>
                    <Switch>
                        <Route
                            path="/testing-path"
                            component={() => (
                                <div>
                                    <div>Testing path </div>
                                    <Link to="/logout">Log out</Link>
                                </div>
                            )}
                        />
                        <Route path="/logout" component={() => <Logout />} />
                        <Route path="/" component={() => <div>Logged out!</div>} />
                    </Switch>
                </Provider>
            </MemoryRouter>
        );
    }
});
