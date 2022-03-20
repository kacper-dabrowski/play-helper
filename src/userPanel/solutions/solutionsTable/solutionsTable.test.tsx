import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { createRequestStatus } from '../../../shared/requestStatus/requestStatus';
import { theme } from '../../../shared/theme/theme';
import { SolutionsTable, SolutionsTableProps } from './solutionsTable';

jest.mock('../../../components/UI/spinner/spinner', () => ({
    Spinner: () => <div>loading</div>,
}));

describe('userPanel - solutions - solutionsTable', () => {
    const removeEntryMock = jest.fn();
    const editEntryMock = jest.fn();
    const clickEntryMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a list for solutions', () => {
        renderComponent();

        expect(screen.getByText('title')).toBeInTheDocument();
        expect(screen.getByText('description')).toBeInTheDocument();
    });

    it('should display a loader, when request status state is loading', () => {
        renderComponent({ ...getDefaultProps(), requestStatus: { ...createRequestStatus(), loading: true } });

        expect(screen.getByText('loading')).toBeInTheDocument();
    });

    it('should call an on click handler on remove button click', () => {
        renderComponent();

        userEvent.click(screen.getByTestId('on-remove-entry'));

        expect(removeEntryMock).toHaveBeenCalledWith('1234');
    });

    it('should call an on click handler on edit button click', () => {
        renderComponent();

        userEvent.click(screen.getByTestId('on-edit-entry'));

        expect(editEntryMock).toHaveBeenCalledWith(createFakeModel());
    });

    it('should call an on click handler on whole table entry click', () => {
        renderComponent();

        userEvent.click(screen.getByTestId('table-entry'));

        expect(clickEntryMock).toHaveBeenCalledWith(createFakeModel());
    });

    it('should display no results info when array empty', () => {
        renderComponent({ ...getDefaultProps(), solutions: [] });

        expect(screen.getByText('Brak wyników')).toBeInTheDocument();
    });

    it('should display no results info when solutions are null empty', () => {
        renderComponent({ ...getDefaultProps(), solutions: null });

        expect(screen.getByText('Brak wyników')).toBeInTheDocument();
    });

    it('should display a globe icon only, if solution is public and user is not an author', () => {
        renderComponent({
            ...getDefaultProps(),
            solutions: [{ ...createFakeModel(), isPublic: true, isAuthor: false }],
        });

        expect(screen.getByTestId('icon-global')).toBeInTheDocument();
        expect(screen.queryByTestId('on-remove-entry')).not.toBeInTheDocument();
        expect(screen.queryByTestId('on-edit-entry')).not.toBeInTheDocument();
    });

    it('should display a globe icon and edit buttons, if solution is public and user is an author', () => {
        renderComponent({
            ...getDefaultProps(),
            solutions: [{ ...createFakeModel(), isPublic: true, isAuthor: true }],
        });

        expect(screen.getByTestId('icon-global')).toBeInTheDocument();
        expect(screen.getByTestId('on-remove-entry')).toBeInTheDocument();
        expect(screen.getByTestId('on-edit-entry')).toBeInTheDocument();
    });

    it('should display edit buttons only, if solution is not public and user is an author', () => {
        renderComponent({
            ...getDefaultProps(),
            solutions: [{ ...createFakeModel(), isPublic: false, isAuthor: true }],
        });

        expect(screen.queryByTestId('icon-global')).not.toBeInTheDocument();
        expect(screen.queryByTestId('on-remove-entry')).toBeInTheDocument();
        expect(screen.queryByTestId('on-edit-entry')).toBeInTheDocument();
    });

    function getDefaultProps() {
        return {
            solutions: [createFakeModel()],
            onRemoveEntry: removeEntryMock,
            onEditEntry: editEntryMock,
            onClickEntry: clickEntryMock,
            requestStatus: createRequestStatus(),
        };
    }

    function renderComponent(props: SolutionsTableProps = getDefaultProps()) {
        return render(
            <ThemeProvider theme={theme}>
                <SolutionsTable {...props} />
            </ThemeProvider>
        );
    }

    function createFakeModel() {
        return {
            title: `title`,
            content: `content`,
            isPublic: false,
            id: '1234',
            description: `description`,
            isAuthor: true,
        };
    }
});
