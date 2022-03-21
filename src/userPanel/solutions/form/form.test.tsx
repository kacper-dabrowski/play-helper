import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { createRequestStatus, RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { theme } from '../../../shared/theme/theme';
import { Maybe } from '../../../shared/types/types';
import { fakeSolutionModel, SolutionModel } from '../store/dto';
import { SolutionForm } from './form';

describe('userPanel - solutions - form', () => {
    const onClearFormMock = jest.fn();
    const onEditSolutionMock = jest.fn();
    const onRefreshSolutions = jest.fn();
    const onAddSolutionMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    [
        {
            mode: 'editing mode',
            expectedButtonText: 'Zapisz zmiany',
            onSubmit: onEditSolutionMock,
            interact: () => {},
            expectedFormData: fakeSolutionModel,
        },
        {
            mode: 'adding mode',
            expectedButtonText: 'Dodaj zamknięcie',
            onSubmit: onAddSolutionMock,
            interact: fillForm,
            expectedFormData: { ...fakeSolutionModel, id: undefined },
        },
    ].forEach(({ mode, expectedButtonText, onSubmit, interact, expectedFormData }) => {
        it(`should display form correctly in ${mode}`, () => {
            givenComponentInMode(mode);

            expect(screen.getByPlaceholderText('Tytuł zamknięcia')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Opis zamknięcia')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Treść zamknięcia')).toBeInTheDocument();
            expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
        });

        it(`should trigger a correct request when in ${mode}`, () => {
            givenComponentInMode(mode);

            interact();

            userEvent.click(screen.getByText(expectedButtonText));

            return waitFor(() => {
                expect(onSubmit).toHaveBeenCalledWith(expectedFormData);
            });
        });

        it(`should clear form values and refresh solutions after a successful submit in ${mode}`, () => {
            givenComponentInMode(mode);

            interact();

            userEvent.click(screen.getByText(expectedButtonText));

            return waitFor(() => {
                expect(onClearFormMock).toHaveBeenCalled();
                expect(onRefreshSolutions).toHaveBeenCalled();
            });
        });
    });

    it('should populate data from a solution, if any is selected', () => {
        getComponent({ selectedSolution: fakeSolutionModel, addSolutionStatus: createRequestStatus() });

        expect(screen.getByPlaceholderText('Tytuł zamknięcia')).toHaveValue('Fake title');
        expect(screen.getByPlaceholderText('Opis zamknięcia')).toHaveValue('Fake description');
    });

    it('should not submit, if values are incorrect', () => {
        getComponent();

        userEvent.click(screen.getByText('Dodaj zamknięcie'));

        return waitFor(() => {
            expect(onAddSolutionMock).not.toHaveBeenCalled();
        });
    });

    function getComponent(
        {
            addSolutionStatus,
            selectedSolution,
        }: {
            addSolutionStatus: RequestStatus;
            selectedSolution: Maybe<SolutionModel>;
        } = { addSolutionStatus: createRequestStatus(), selectedSolution: null }
    ) {
        return render(
            <ThemeProvider theme={theme}>
                <SolutionForm
                    addSolutionStatus={addSolutionStatus}
                    onAddSolution={onAddSolutionMock}
                    onEditSolution={onEditSolutionMock}
                    onClearForm={onClearFormMock}
                    selectedSolution={selectedSolution}
                    onRefreshSolutions={onRefreshSolutions}
                />
            </ThemeProvider>
        );
    }

    function givenComponentInMode(mode: string) {
        return getComponent({
            selectedSolution: mode === 'editing mode' ? fakeSolutionModel : null,
            addSolutionStatus: createRequestStatus(),
        });
    }

    function fillForm() {
        userEvent.type(screen.getByPlaceholderText('Tytuł zamknięcia'), 'Fake title');
        userEvent.type(screen.getByPlaceholderText('Opis zamknięcia'), 'Fake description');
        userEvent.type(screen.getByPlaceholderText('Treść zamknięcia'), 'Fake content');
    }
});
