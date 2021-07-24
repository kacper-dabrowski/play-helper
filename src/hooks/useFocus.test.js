import { render, screen } from '@testing-library/react';
import useFocus from './useFocus';

describe('hooks - useFocus', () => {
    it('should focus automatically on mount', () => {
        render(<DummyInput />);

        const input = screen.getByPlaceholderText('dummy input');

        expect(document.activeElement).toBe(input);
    });

    const DummyInput = () => {
        const ref = useFocus();

        return <input ref={ref} placeholder="dummy input" />;
    };
});
