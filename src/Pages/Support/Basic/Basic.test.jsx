import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Basic from './Basic';
import { generateBasicTemplate } from '../../../modules/basic/basic';
import { toastProvider } from '../../../libs/toast';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../../shared/theme/theme';

jest.mock('../../../modules/basic/basic', () => ({
    generateBasicTemplate: jest.fn(),
    generateTelephoneTemplate: jest.fn(),
}));

describe('Support - Basic', () => {
    it('should call generate template and show it on main textarea, when data is valid', () => {
        renderComponent();

        fillAndSubmitForm();

        return waitFor(() => {
            expect(generateBasicTemplate).toHaveBeenCalledWith({
                channel: 'HELPLINE',
                date: '2021-01-01',
                details: 'some details',
                general: 'some general text',
                hasOffer: false,
                name: 'Test Testing',
                sex: 'MAN',
                type: 'BUSINESS',
            });
        });
    });

    it('should show a toast message with error if occurred', () => {
        generateBasicTemplate.mockImplementation(() => {
            throw new Error('error!');
        });

        renderComponent();

        fillAndSubmitForm({ ...defaultValues, sex: '' });
        const toastProviderSpy = jest.spyOn(toastProvider, 'error');

        return waitFor(() => {
            expect(toastProviderSpy).toHaveBeenCalledWith('error!');
        });
    });

    const defaultValues = {
        sex: 'Mężczyzna',
        channel: 'Infolinia',
        type: 'Biznesowy',
        date: '2021-01-01',
        general: 'some general text',
        details: 'some details',
    };
    function fillAndSubmitForm(values = defaultValues) {
        if (values.sex) {
            userEvent.click(screen.getByText(values.sex));
        }
        userEvent.click(screen.getByText(values.channel));
        userEvent.click(screen.getByText(values.type));
        userEvent.type(screen.getByTestId('basic-date-input'), values.date);
        userEvent.type(screen.getByPlaceholderText('które dotyczyło...'), values.general);
        userEvent.type(screen.getByPlaceholderText('uprzejmie informuję, że...'), values.details);

        if (values.hasOffer) {
            userEvent.click(screen.getByRole('checkbox'));
        }

        userEvent.click(screen.getByText('Zatwierdź'));
    }

    function renderComponent() {
        render(
            <ThemeProvider theme={theme}>
                <Basic name="Test Testing" />
            </ThemeProvider>
        );
    }
});
