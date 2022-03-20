import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'jest-mock';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import axios from '../../libs/axios';
import { theme } from '../../shared/theme/theme';
import { SolutionsEditor } from './solutionsEditor';
import { fakeFetchSolutionsDto } from './store/dto';
import solutionsSlice from './store/solutionsSlice';

jest.mock('../../libs/axios');

const defaultStore = configureStore({ reducer: { solutions: solutionsSlice } });

describe('userPanel - supportRequests', () => {
    const httpClient = mocked(axios, true);
    let store: typeof defaultStore;

    beforeEach(() => {
        store = configureStore({ reducer: { solutions: solutionsSlice } });
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
            expect(httpClient.delete).toHaveBeenCalledWith('http://localhost:3001/solutions/1234');
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

            userEvent.click(screen.getByText('Dodaj zamknięcie'));

            return waitFor(() => {
                expect(httpClient.put).toHaveBeenCalledWith('http://localhost:3001/solutions', {
                    content: 'Fake content added',
                    description: 'Fake description added',
                    isPublic: true,
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
                expect(screen.getByPlaceholderText('Treść zamknięcia')).toHaveValue('Fake content');
                expect(screen.getByPlaceholderText('Opis zamknięcia')).toHaveValue('Fake description');
                expect(screen.getByPlaceholderText('Tytuł zamknięcia')).toHaveValue('Fake title');
            });
        });

        it('should trigger edit request for selected support request and refetch after that', async () => {
            givenSupportRequests();

            renderComponent();

            await waitFor(() => screen.queryByTestId('on-edit-entry'));

            userEvent.click(screen.getByTestId('on-edit-entry'));

            userEvent.type(screen.getByPlaceholderText('Treść zamknięcia'), 'Another title');

            userEvent.click(screen.getByText('Zapisz zmiany'));

            return waitFor(() => {
                expect(httpClient.post).toHaveBeenCalledWith('http://localhost:3001/solutions/1234', {
                    content: 'Fake contentAnother title',
                    description: 'Fake description',
                    id: '1234',
                    isPublic: false,
                    title: 'Fake title',
                });
            });
        });
    });

    function renderComponent() {
        return render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <SolutionsEditor />
                </Provider>
            </ThemeProvider>
        );
    }

    function givenSupportRequests() {
        httpClient.get.mockResolvedValue({ data: fakeFetchSolutionsDto });
    }

    function givenSupportRequestsToFilter() {
        httpClient.get.mockResolvedValue({
            data: [
                ...fakeFetchSolutionsDto,
                {
                    title: 'searchable title',
                    description: 'Fake description',
                    content: 'Fake content',
                    isPublic: false,
                    _id: '5678',
                },
            ],
        });
    }

    function fillForm() {
        userEvent.type(screen.getByPlaceholderText('Tytuł zamknięcia'), 'Fake title added');
        userEvent.type(screen.getByPlaceholderText('Opis zamknięcia'), 'Fake description added');
        userEvent.type(screen.getByPlaceholderText('Treść zamknięcia'), 'Fake content added');
        userEvent.click(screen.getByTestId('is-public-checkbox'));
    }
});
