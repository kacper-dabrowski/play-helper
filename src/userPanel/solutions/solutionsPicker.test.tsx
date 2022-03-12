import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { SolutionPicker } from './solutionsPicker';
import solutionsSlice from './store/solutionsSlice';
import axios from '../../libs/axios';
import { mocked } from 'jest-mock';
import { fakeFetchSolutionsDto } from './store/dto';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../shared/theme/theme';
import { fetchSolutions } from './store/solutions';
import userEvent from '@testing-library/user-event';

jest.mock('../../libs/axios');
jest.mock('../../components/UI/spinner/spinner', () => ({
    Spinner: () => <div>loading</div>,
}));

const defaultStore = configureStore({ reducer: { solutions: solutionsSlice } });

describe('userPanel - solutionsPicker', () => {
    const httpClient = mocked(axios, true);

    let store: typeof defaultStore;
    let dispatch;

    beforeEach(() => {
        store = defaultStore;
        dispatch = store.dispatch;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render a list of solutions to pick', async () => {
        await givenSolutionsAreThere();

        getComponent();

        return waitFor(() => {
            expect(screen.queryByText('Fake title')).toBeInTheDocument();
            expect(screen.queryByText('Fake description')).toBeInTheDocument();
            expect(screen.queryByText('Fake content')).toBeInTheDocument();
        });
    });

    it('should paste the content of a solution on click', async () => {
        await givenSolutionsAreThere();

        getComponent();

        await waitFor(() => expect(screen.queryByText('Fake content')).toBeInTheDocument());

        userEvent.click(screen.getByText('Fake content'));

        expect(screen.getByTestId('main-textarea')).toHaveTextContent('Fake content');
    });

    it('should display a loader, when solutions are loading', () => {
        givenSolutionsLoading();

        getComponent();

        expect(screen.getByText('loading')).toBeInTheDocument();
    });

    it('should display no results string, when solutions are empty', async () => {
        await givenSolutionsAreNotThere();

        getComponent();

        return waitFor(() => {
            expect(screen.queryByText('Brak wyników')).toBeInTheDocument();
        });
    });

    function getComponent() {
        return render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <SolutionPicker />
                </Provider>
            </ThemeProvider>
        );
    }

    async function givenSolutionsAreThere() {
        httpClient.get.mockResolvedValue({ data: fakeFetchSolutionsDto });
        await dispatch(fetchSolutions());
    }

    function givenSolutionsLoading() {
        httpClient.get.mockResolvedValue({ data: fakeFetchSolutionsDto });

        dispatch(fetchSolutions());
    }

    async function givenSolutionsAreNotThere() {
        httpClient.get.mockResolvedValue({ data: [] });

        await dispatch(fetchSolutions());
    }
});
