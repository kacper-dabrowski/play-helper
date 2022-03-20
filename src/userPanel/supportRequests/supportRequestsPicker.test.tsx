import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import supportRequestsSlice from './store/supportRequestsSlice';
import axios from '../../libs/axios';
import { mocked } from 'jest-mock';

import { ThemeProvider } from 'styled-components';
import { theme } from '../../shared/theme/theme';
import userEvent from '@testing-library/user-event';
import { SupportRequestsPicker } from './supportRequestsPicker';
import { fetchSupportRequests } from './store/supportRequests';
import { fakeSupportRequestsDto } from './store/dto';

jest.mock('../../libs/axios');
jest.mock('../../components/UI/spinner/spinner', () => ({
    Spinner: () => <div>loading</div>,
}));

const defaultStore = configureStore({ reducer: { supportRequests: supportRequestsSlice } });

describe('userPanel - supportRequestsPicker', () => {
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
        await givenSupportRequestsAreThere();

        getComponent();

        return waitFor(() => {
            expect(screen.queryByText('Fake title')).toBeInTheDocument();
            expect(screen.queryByText('Fake description')).toBeInTheDocument();
            expect(screen.queryByText('Fake department')).toBeInTheDocument();
        });
    });

    it('should paste the content of a support request on click', async () => {
        await givenSupportRequestsAreThere();

        getComponent();

        await waitFor(() => expect(screen.queryByText('Fake title')).toBeInTheDocument());

        userEvent.click(screen.getByText('Fake title'));

        expect(screen.getByTestId('main-textarea')).toHaveTextContent('Fake content');
    });

    it('should display a loader, when support requests are loading', () => {
        givenSupportRequestsLoading();

        getComponent();

        expect(screen.getByText('loading')).toBeInTheDocument();
    });

    it('should display no results string, when support requests are empty', async () => {
        await givenSupportRequestsNotThere();

        getComponent();

        return waitFor(() => {
            expect(screen.queryByText('Brak wyników')).toBeInTheDocument();
        });
    });

    function getComponent() {
        return render(
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <SupportRequestsPicker />
                </Provider>
            </ThemeProvider>
        );
    }

    async function givenSupportRequestsAreThere() {
        httpClient.get.mockResolvedValue({ data: fakeSupportRequestsDto });
        await dispatch(fetchSupportRequests());
    }

    function givenSupportRequestsLoading() {
        httpClient.get.mockResolvedValue({ data: fakeSupportRequestsDto });

        dispatch(fetchSupportRequests());
    }

    async function givenSupportRequestsNotThere() {
        httpClient.get.mockResolvedValue({ data: [] });

        await dispatch(fetchSupportRequests());
    }
});
