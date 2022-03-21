import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Double from './Double';
import config from '../../../shared/identifiers';
import { toastProvider } from '../../../libs/toast';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../../shared/theme/theme';
import { generateClosedDoubleTemplate } from '../../../modules/closedDouble/closedDouble';
import { generateOpenedDoubleTemplate } from '../../../modules/openedDouble/openedDouble';

jest.mock('../../../modules/closedDouble/closedDouble');

jest.mock('../../../modules/openedDouble/openedDouble');

describe('Support - Double', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render additional gender setting buttons if double is closed', () => {
        renderComponent(config.double.closed);

        expect(screen.getByText('Mężczyzna')).toBeInTheDocument();
    });

    it('should not render additional gender setting buttons if double is opened', () => {
        renderComponent(config.double.opened);

        expect(screen.queryByText('Mężczyzna')).not.toBeInTheDocument();
    });

    it('should call generate double opened template on confirm button click', () => {
        renderComponent(config.double.opened);

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

        renderComponent(config.double.opened);

        fillAndSubmitForm();

        userEvent.click(screen.getByText('Zatwierdź'));
        const errorToastSpy = jest.spyOn(toastProvider, 'error');

        return waitFor(() => {
            expect(errorToastSpy).toHaveBeenCalledWith('error!');
        });
    });

    it('should show a toast message, when generate template for double closed fails', () => {
        generateClosedDoubleTemplate.mockImplementation(() => {
            throw new Error('error!');
        });

        renderComponent(config.double.closed);

        fillAndSubmitForm({ ...defaultValues, sex: 'Mężczyzna' });

        userEvent.click(screen.getByText('Zatwierdź'));
        const errorToastSpy = jest.spyOn(toastProvider, 'error');

        return waitFor(() => {
            expect(errorToastSpy).toHaveBeenCalledWith('error!');
        });
    });

    it('should call generate double closed template on confirm button click', () => {
        renderComponent(config.double.closed);

        fillAndSubmitForm({ ...defaultValues, sex: 'Mężczyzna' });

        userEvent.click(screen.getByText('Zatwierdź'));

        return waitFor(() => {
            expect(generateClosedDoubleTemplate).toHaveBeenCalledWith(
                'MAN',
                defaultValues.current,
                defaultValues.doubled
            );
        });
    });

    const defaultValues = {
        sex: '',
        doubled: '987654321',
        current: '123456789',
    };

    function fillAndSubmitForm(values = defaultValues) {
        if (values.sex) {
            userEvent.click(screen.getByText(values.sex));
            userEvent.type(screen.getByPlaceholderText('Numer zamkniętego zgłoszenia'), values.doubled);
        } else {
            userEvent.type(screen.getByPlaceholderText('Numer otwartego zgłoszenia'), values.doubled);
        }

        userEvent.type(screen.getByPlaceholderText('Numer Twojego zgłoszenia'), values.current);
    }

    function renderComponent(type: string): void {
        render(
            <ThemeProvider theme={theme}>
                <Double type={type} />
            </ThemeProvider>
        );
    }
});
