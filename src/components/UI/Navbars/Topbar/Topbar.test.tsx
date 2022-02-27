import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Topbar from './Topbar';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../shared/theme/theme';

describe('UI - Navbars - Topbar', () => {
    const onSettingsModalOpenedMock = jest.fn();
    const username = 'username';

    const defaultProps = {
        onSettingsModalOpened: onSettingsModalOpenedMock,
        isAuthenticated: false,
        fullName: username,
    };

    function getComponentWithProps(props = defaultProps) {
        return (
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Topbar {...props} />
                </ThemeProvider>
            </BrowserRouter>
        );
    }

    function getLogoutButton() {
        return screen.queryByText('Wyloguj');
    }

    function getUserPanelButton() {
        return screen.queryByText('Panel użytkownika');
    }

    function getUserSettingsButton() {
        return screen.getByTestId('icon-button');
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
    });

    it('should render settings button, logout button, panel button and users name', () => {
        render(getComponentWithProps({ ...defaultProps, isAuthenticated: true }));

        expect(getLogoutButton()).toBeInTheDocument();
        expect(getUserPanelButton()).toBeInTheDocument();
        expect(screen.queryByTestId('icon-button')).toBeInTheDocument();
        expect(screen.queryByText(username)).toBeInTheDocument();
    });

    it('should open user panel on user panel button click', () => {
        render(getComponentWithProps({ ...defaultProps, isAuthenticated: true }));

        userEvent.click(getUserSettingsButton());

        return waitFor(() => {
            expect(onSettingsModalOpenedMock).toHaveBeenCalled();
        });
    });
});
