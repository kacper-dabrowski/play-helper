import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Double from './Double';
import { toastProvider } from '../../../libs/toast';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../shared/theme/theme';
import { generateClosedDoubleTemplate } from '../../../modules/closedDouble/closedDouble';
import { generateOpenedDoubleTemplate } from '../../../modules/openedDouble/openedDouble';
import { CustomerGender, DoubledNotificationType } from '../../../shared/identifiers';
import { mocked } from 'jest-mock';

jest.mock('../../../modules/closedDouble/closedDouble');

jest.mock('../../../modules/openedDouble/openedDouble');

describe('Support - Double', () => {
    const mockedClosedDouble = mocked(generateClosedDoubleTemplate, true);

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render additional gender setting buttons if double is closed', () => {
        renderComponent(DoubledNotificationType.Closed);

        expect(screen.getByText('Mężczyzna')).toBeInTheDocument();
    });

    it('should not render additional gender setting buttons if double is opened', () => {
        renderComponent(DoubledNotificationType.Opened);

        expect(screen.queryByText('Mężczyzna')).not.toBeInTheDocument();
    });

    it('should call generate double opened template on confirm button click', () => {
        renderComponent(DoubledNotificationType.Opened);

        fillAndSubmitForm();

        userEvent.click(screen.getByText('Zatwierdź'));

        return waitFor(() => {
            expect(generateOpenedDoubleTemplate).toHaveBeenCalledWith(defaultValues.current, defaultValues.doubled);
        });
    });

    it('should show a toast message, when generate template for double opened fails', () => {
        generateOpenedDoubleTemplate.mockImplementation(() => {
            throw new Error('error!');
        });

        renderComponent(DoubledNotificationType.Opened);

        fillAndSubmitForm();

        userEvent.click(screen.getByText('Zatwierdź'));
        const errorToastSpy = jest.spyOn(toastProvider, 'error');

        return waitFor(() => {
            expect(errorToastSpy).toHaveBeenCalledWith('error!');
        });
    });

    it('should show a toast message, when generate template for double closed fails', () => {
        mockedClosedDouble.mockImplementation(() => {
            throw new Error('error!');
        });

        renderComponent(DoubledNotificationType.Closed);

        fillAndSubmitForm({ ...defaultValues, gender: 'Mężczyzna' });

        userEvent.click(screen.getByText('Zatwierdź'));
        const errorToastSpy = jest.spyOn(toastProvider, 'error');

        return waitFor(() => {
            expect(errorToastSpy).toHaveBeenCalledWith('error!');
        });
    });

    it('should call generate double closed template on confirm button click', () => {
        renderComponent(DoubledNotificationType.Closed);

        fillAndSubmitForm({ ...defaultValues, gender: 'Mężczyzna' });

        userEvent.click(screen.getByText('Zatwierdź'));

        return waitFor(() => {
            expect(generateClosedDoubleTemplate).toHaveBeenCalledWith(
                CustomerGender.Man,
                defaultValues.current,
                defaultValues.doubled
            );
        });
    });

    const defaultValues = {
        gender: '',
        doubled: '987654321',
        current: '123456789',
    };

    function fillAndSubmitForm(values = defaultValues) {
        if (values.gender) {
            userEvent.click(screen.getByText(values.gender));
            userEvent.type(screen.getByPlaceholderText('Numer zamkniętego zgłoszenia'), values.doubled);
        } else {
            userEvent.type(screen.getByPlaceholderText('Numer otwartego zgłoszenia'), values.doubled);
        }

        userEvent.type(screen.getByPlaceholderText('Numer Twojego zgłoszenia'), values.current);
    }

    function renderComponent(type: DoubledNotificationType): void {
        render(
            <ThemeProvider theme={theme}>
                <Double type={type} />
            </ThemeProvider>
        );
    }
});
