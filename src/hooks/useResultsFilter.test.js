import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useResultsFilter from './useResultsFilter';

const dummyFilterFn = (results, searchQuery) => {
    return results.filter((result) => result.includes(searchQuery));
};

const DummyInputComponent = () => {
    const results = ['abc', 'a', 'b'];

    const [searchResults, searchQuery, setSearchQuery] = useResultsFilter(results, dummyFilterFn);

    return (
        <div>
            <p>{searchResults.join(', ')}</p>
            <input placeholder="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />;
        </div>
    );
};

function renderComponent() {
    return render(<DummyInputComponent />);
}

describe('hooks - useResultsFilter', () => {
    it('should return untouched results on mount', () => {
        renderComponent();

        expect(screen.getByText('abc, a, b')).toBeInTheDocument();
    });

    it('should return filtered results when search query is present', () => {
        renderComponent();

        const input = screen.getByPlaceholderText('search');

        act(() => {
            fireEvent.change(input, { target: { value: 'a' } });
        });

        return waitFor(() => {
            expect(screen.getByText('abc, a')).toBeInTheDocument();
        });
    });

    it('should return all results, when query is entered and then erased', async () => {
        renderComponent();

        const input = screen.getByPlaceholderText('search');

        await act(async () => {
            fireEvent.change(input, { target: { value: 'a' } });
        });

        expect(input?.value).toEqual('a');
        expect(screen.getByText('abc, a')).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(input, { target: { value: '' } });
        });

        return waitFor(() => {
            expect(screen.getByText('abc, a, b')).toBeInTheDocument();
        });
    });
});
