import { render, screen } from '@testing-library/react';
import React from 'react';
import useFocus from './useFocus';

function DummyInput() {
    const ref = useFocus();

    return <input ref={ref} placeholder="dummy input" />;
}

describe('hooks - useFocus', () => {
    it('should focus automatically on mount', () => {
        render(<DummyInput />);

        const input = screen.getByPlaceholderText('dummy input');

        expect(document.activeElement).toBe(input);
    });
});
