import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../shared/theme/theme';
import { SearchBox } from './searchBox';

describe('userPanel - components - searchBox', () => {
    it('should render component correctly', () => {
        render(<FakeComponent />);

        expect(getSearchBox()).toBeInTheDocument();
        expect(getSearchBox()).toHaveAttribute('type', 'search');
    });

    it('should call a setter with current input value, when user types something', () => {
        render(<FakeComponent />);

        userEvent.type(getSearchBox(), 'abcdef');

        expect(screen.getByText('current value: abcdef')).toBeInTheDocument();
    });

    function getSearchBox(): HTMLInputElement {
        return screen.getByPlaceholderText('Wpisz wyszukiwaną frazę');
    }

    function FakeComponent() {
        const [value, setValue] = useState('');

        return (
            <ThemeProvider theme={theme}>
                <SearchBox setValue={setValue} value={value} />
                <div>current value: {value}</div>
            </ThemeProvider>
        );
    }
});
