import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../shared/theme/theme';
import Navbar from './Navbar';

const routesConfig = {
    main: { title: 'Some title', exact: true, path: '/support' },
    basic: { title: 'Some title1', exact: true, path: '/support/basic' },
    doubleOpened: { title: 'Some title2', exact: true, path: '/support/double-opened' },
};

function getComponentWithRouter() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Navbar routes={routesConfig} username="Some username" />
            </ThemeProvider>
        </BrowserRouter>
    );
}

describe('UI - Navbars - PageNavbar', () => {
    it('should render a navbar with specified routes and username', () => {
        render(getComponentWithRouter());

        expect(screen.getByText('Some title')).toBeInTheDocument();
        expect(screen.getByText('Some title1')).toBeInTheDocument();
        expect(screen.getByText('Some title2')).toBeInTheDocument();
        expect(screen.getByText('Some username')).toBeInTheDocument();
    });
});
