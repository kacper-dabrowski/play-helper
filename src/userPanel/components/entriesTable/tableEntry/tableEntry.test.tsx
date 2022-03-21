import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../../../shared/theme/theme';
import { TableEntry, TableEntryProps } from './tableEntry';

describe('userPanel - components - entriesTable - tableEntry', () => {
    const onClickMock = jest.fn();
    const onEditMock = jest.fn();
    const onRemoveMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a globe icon if displayGlobeIcon set to true', () => {
        renderComponent({ ...getDefaultProps(), displayGlobeIcon: true });

        expect(screen.getByTestId('icon-global')).toBeInTheDocument();
    });

    it('should not render a globe icon if displayGlobeIcon set to false', () => {
        renderComponent({ ...getDefaultProps(), displayGlobeIcon: false });

        expect(screen.queryByTestId('icon-global')).not.toBeInTheDocument();
    });

    describe('rendering entry control buttons', () => {
        [
            { onEdit: undefined, onRemove: onRemoveMock, missingFunction: 'onRemove' },
            { onEdit: onEditMock, onRemove: undefined, missingFunction: 'onEdit' },
            { onEdit: undefined, onRemove: undefined, missingFunction: 'both' },
        ].forEach(({ onEdit, onRemove, missingFunction }) => {
            it(`should not render edit nor remove button, if ${missingFunction} function(s) not provided`, () => {
                renderComponent({ ...getDefaultProps(), onEditEntry: onEdit, onRemoveEntry: onRemove });

                expect(screen.queryByTestId('on-remove-entry')).not.toBeInTheDocument();
                expect(screen.queryByTestId('on-edit-entry')).not.toBeInTheDocument();
            });
        });

        it('should render both buttons with their click handlers if both functions provided', () => {
            renderComponent();

            userEvent.click(screen.getByTestId('on-edit-entry'));
            userEvent.click(screen.getByTestId('on-remove-entry'));

            expect(onEditMock).toHaveBeenCalled();
            expect(onRemoveMock).toHaveBeenCalled();
        });
    });

    function getDefaultProps(): TableEntryProps {
        return {
            onClickEntry: onClickMock,
            onEditEntry: onEditMock,
            onRemoveEntry: onRemoveMock,
            renderEntry,
            displayGlobeIcon: false,
        };
    }

    function renderComponent(props: TableEntryProps = getDefaultProps()) {
        return render(
            <ThemeProvider theme={theme}>
                <TableEntry {...props} />
            </ThemeProvider>
        );
    }

    function renderEntry() {
        return <div>entry</div>;
    }
});
