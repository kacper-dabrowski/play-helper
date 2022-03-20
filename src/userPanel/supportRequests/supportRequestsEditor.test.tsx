import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'jest-mock';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import axios from '../../libs/axios';
import { theme } from '../../shared/theme/theme';
import { fakeSupportRequestModel, fakeSupportRequestsDto } from './store/dto';
import supportRequestsSlice from './store/supportRequestsSlice';
import { SupportRequestsEditor } from './supportRequestsEditor';

jest.mock('../../libs/axios');

const defaultStore = configureStore({ reducer: { supportRequests: supportRequestsSlice } });

describe('userPanel - supportRequests', () => {
    const httpClient = mocked(axios, true);
    let store: typeof defaultStore;

    beforeEach(() => {
        store = configureStore({ reducer: { supportRequests: supportRequestsSlice } });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should trigger a remove request, when delete icon is clicked on certain SRQ result', async () => {
        givenSupportRequests();

        renderComponent();

        expect(httpClient.get).toHaveBeenCalled();

        await waitFor(() => screen.queryByTestId('on-remove-entry'));

        userEvent.click(screen.getByTestId('on-remove-entry'));

        return waitFor(() => {
            expect(httpClient.delete).toHaveBeenCalledWith('http://localhost:3001/srq/1234');
            expect(httpClient.get).toHaveBeenCalledTimes(2);
        });
    });

    it('should filter out fetched support requests on type in the search box', async () => {
        givenSupportRequestsToFilter();

        renderComponent();

        await waitFor(() => screen.queryByTestId('on-remove-entry'));

        userEvent.type(screen.getByPlaceholderText('Wpisz wyszukiwaną frazę'), 'searchable title');

        return waitFor(() => {
            expect(screen.getByText('searchable title')).toBeInTheDocument();
            expect(screen.queryByText('Fake title')).not.toBeInTheDocument();
        });
    });

    describe('adding mode', () => {
        it('should send an add support request request and refetch after that', async () => {
            renderComponent();

            expect(httpClient.get).toHaveBeenCalled();

            fillForm();

            userEvent.click(screen.getByText('Dodaj SRQ'));

            return waitFor(() => {
                expect(httpClient.put).toHaveBeenCalledWith('http://localhost:3001/srq', {
                    content: 'Fake content added',
                    department: 'Fake department added',
                    description: 'Fake description added',
                    title: 'Fake title added',
                });
                expect(httpClient.get).toHaveBeenCalledTimes(2);
            });
        });
    });

    describe('edit mode', () => {
        it('should populate fields of selected support request in the form', async () => {
            givenSupportRequests();

            renderComponent();

            expect(httpClient.get).toHaveBeenCalled();

            await waitFor(() => screen.queryByTestId('on-edit-entry'));

            userEvent.click(screen.getByTestId('on-edit-entry'));

            return waitFor(() => {
                expect(screen.getByPlaceholderText('Dział, do którego trafia SRQ')).toHaveValue('Fake department');
                expect(screen.getByPlaceholderText('Treść SRQ')).toHaveValue('Fake content');
                expect(screen.getByPlaceholderText('Opis SRQ')).toHaveValue('Fake description');
                expect(screen.getByPlaceholderText('Tytuł SRQ')).toHaveValue('Fake title');
            });
        });

        it('should trigger edit request for selected support request and refetch after that', async () => {
            givenSupportRequests();

            renderComponent();

            await waitFor(() => screen.queryByTestId('on-edit-entry'));

            userEvent.click(screen.getByTestId('on-edit-entry'));

            userEvent.type(screen.getByPlaceholderText('Treść SRQ'), 'Another title');

            userEvent.click(screen.getByText('Zapisz zmiany'));

            return waitFor(() => {
                expect(httpClient.post).toHaveBeenCalledWith('http://localhost:3001/srq/1234', {
                    content: 'Fake contentAnother title',
                    department: 'Fake department',
                    description: 'Fake description',
                    title: 'Fake title',
                });
            });
        });
    });

    function renderComponent() {
        return render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <SupportRequestsEditor />
                </Provider>
            </ThemeProvider>
        );
    }

    function givenSupportRequests() {
        httpClient.get.mockResolvedValue({ data: fakeSupportRequestsDto });
    }

    function givenSupportRequestsToFilter() {
        httpClient.get.mockResolvedValue({
            data: {
                supportRequests: [
                    ...fakeSupportRequestsDto.supportRequests,
                    { ...fakeSupportRequestModel, title: 'searchable title', _id: '5678' },
                ],
            },
        });
    }

    function fillForm() {
        userEvent.type(screen.getByPlaceholderText('Tytuł SRQ'), 'Fake title added');
        userEvent.type(screen.getByPlaceholderText('Opis SRQ'), 'Fake description added');
        userEvent.type(screen.getByPlaceholderText('Treść SRQ'), 'Fake content added');
        userEvent.type(screen.getByPlaceholderText('Dział, do którego trafia SRQ'), 'Fake department added');
    }
});
