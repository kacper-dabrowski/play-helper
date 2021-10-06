import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Topbar from './Topbar';

describe('UI - Navbars - Topbar', () => {
    const onSettingsModalOpenedMock = jest.fn();
    const onLoginModalOpenedMock = jest.fn();
    const onSignUpModalOpenedMock = jest.fn();
    const username = 'username';

    const defaultProps = {
        onSettingsModalOpened: onSettingsModalOpenedMock,
        onLoginModalOpened: onLoginModalOpenedMock,
        onSignUpModalOpened: onSignUpModalOpenedMock,
        isAuthenticated: false,
        fullName: username,
    };

    function getComponentWithProps(props = defaultProps) {
        return (
            <BrowserRouter>
                <Topbar {...props} />
            </BrowserRouter>
        );
    }

    function getLoginButton() {
        return screen.queryByText('Zaloguj');
    }

    function getLogoutButton() {
        return screen.queryByText('Wyloguj');
    }

    function getSignUpButton() {
        return screen.queryByText('Załóż konto');
    }

    function getUserPanelButton() {
        return screen.queryByText('Panel użytkownika');
    }

    function getUserSettingsButton() {
        return screen.queryByTestId('icon-button');
    }

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render navlinks and auth modal opening buttons for not authenticated user', () => {
        render(getComponentWithProps());

        expect(getLogoutButton()).not.toBeInTheDocument();
        expect(getUserPanelButton()).not.toBeInTheDocument();
        expect(screen.queryByTestId('icon-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId(username)).not.toBeInTheDocument();
        expect(getLoginButton()).toBeInTheDocument();
        expect(getSignUpButton()).toBeInTheDocument();
    });

    it('should call open login modal on login button click', () => {
        render(getComponentWithProps());

        userEvent.click(getLoginButton());

        return waitFor(() => {
            expect(onLoginModalOpenedMock).toHaveBeenCalled();
        });
    });

    it('should open sign in modal on sign in button click', () => {
        render(getComponentWithProps());

        userEvent.click(getSignUpButton());

        return waitFor(() => {
            expect(onSignUpModalOpenedMock).toHaveBeenCalled();
        });
    });

    it('should render settings button, logout button, panel button and users name', () => {
        render(getComponentWithProps({ ...defaultProps, isAuthenticated: true }));

        expect(getLogoutButton()).toBeInTheDocument();
        expect(getUserPanelButton()).toBeInTheDocument();
        expect(screen.queryByTestId('icon-button')).toBeInTheDocument();
        expect(screen.queryByText(username)).toBeInTheDocument();
        expect(getLoginButton()).not.toBeInTheDocument();
        expect(getSignUpButton()).not.toBeInTheDocument();
    });

    it('should open user panel on user panel button click', () => {
        render(getComponentWithProps({ ...defaultProps, isAuthenticated: true }));

        userEvent.click(getUserSettingsButton());

        return waitFor(() => {
            expect(onSettingsModalOpenedMock).toHaveBeenCalled();
        });
    });
});
