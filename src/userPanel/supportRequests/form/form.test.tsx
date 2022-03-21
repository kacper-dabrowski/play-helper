import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { createRequestStatus, RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { theme } from '../../../shared/theme/theme';
import { Maybe } from '../../../shared/types/types';
import { ModifySupportRequestDto, fakeSupportRequestModel } from '../store/dto';
import { SupportRequestForm } from './form';

describe('userPanel - SRQ - form', () => {
    const onClearFormMock = jest.fn();
    const onEditSupportRequestMock = jest.fn();
    const onRefreshSupportRequestsMock = jest.fn();
    const onAddSupportRequestMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    [
        {
            mode: 'editing mode',
            expectedButtonText: 'Zapisz zmiany',
            onSubmit: onEditSupportRequestMock,
            interact: () => {},
            expectedFormData: { ...fakeSupportRequestModel, _id: '1234' },
        },
        {
            mode: 'adding mode',
            expectedButtonText: 'Dodaj SRQ',
            onSubmit: onAddSupportRequestMock,
            interact: fillForm,
            expectedFormData: { ...fakeSupportRequestModel, _id: '' },
        },
    ].forEach(({ mode, expectedButtonText, onSubmit, interact, expectedFormData }) => {
        it(`should display form correctly in ${mode}`, () => {
            givenComponentInMode(mode);

            expect(screen.getByPlaceholderText('Tytuł SRQ')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Opis SRQ')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Treść SRQ')).toBeInTheDocument();
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
                expect(onRefreshSupportRequestsMock).toHaveBeenCalled();
            });
        });
    });

    it('should populate data from a solution, if any is selected', () => {
        getComponent({
            selectedSupportRequest: { ...fakeSupportRequestModel },
            addSupportRequestStatus: createRequestStatus(),
        });

        expect(screen.getByPlaceholderText('Tytuł SRQ')).toHaveValue('Fake title');
        expect(screen.getByPlaceholderText('Opis SRQ')).toHaveValue('Fake description');
        expect(screen.getByPlaceholderText('Treść SRQ')).toHaveTextContent('Fake content');
    });

    it('should not submit, if values are incorrect', () => {
        getComponent();

        userEvent.click(screen.getByText('Dodaj SRQ'));

        return waitFor(() => {
            expect(onAddSupportRequestMock).not.toHaveBeenCalled();
        });
    });

    function getComponent(
        {
            addSupportRequestStatus,
            selectedSupportRequest,
        }: {
            addSupportRequestStatus: RequestStatus;
            selectedSupportRequest: Maybe<ModifySupportRequestDto>;
        } = { addSupportRequestStatus: createRequestStatus(), selectedSupportRequest: null }
    ) {
        return render(
            <ThemeProvider theme={theme}>
                <SupportRequestForm
                    addSupportRequestStatus={addSupportRequestStatus}
                    onAddSupportRequest={onAddSupportRequestMock}
                    onEditSupportRequest={onEditSupportRequestMock}
                    onClearForm={onClearFormMock}
                    selectedSupportRequest={selectedSupportRequest}
                    onRefreshSupportRequest={onRefreshSupportRequestsMock}
                />
            </ThemeProvider>
        );
    }

    function givenComponentInMode(mode: string) {
        return getComponent({
            selectedSupportRequest: mode === 'editing mode' ? { ...fakeSupportRequestModel } : null,
            addSupportRequestStatus: createRequestStatus(),
        });
    }

    function fillForm() {
        userEvent.type(screen.getByPlaceholderText('Tytuł SRQ'), 'Fake title');
        userEvent.type(screen.getByPlaceholderText('Opis SRQ'), 'Fake description');
        userEvent.type(screen.getByPlaceholderText('Treść SRQ'), 'Fake content');
        userEvent.type(screen.getByPlaceholderText('Dział, do którego trafia SRQ'), 'Fake department');
    }
});
