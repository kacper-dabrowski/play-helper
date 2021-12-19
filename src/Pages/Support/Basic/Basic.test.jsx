import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cogoToast from 'cogo-toast';
import React from 'react';
import { generateBasicTemplate } from '../../../modules/basic/basic';
import { ChannelType, CustomerType, Salutation } from '../../../shared/identifiers';
import Basic from './Basic';

jest.mock('../../../modules/basic/basic', () => ({
    generateBasicTemplate: jest.fn(),
    generateTelephoneTemplate: jest.fn(),
}));

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

describe('Support - Basic', () => {
    it('should call generate template and show it on main textarea, when data is valid', () => {
        render(<Basic name="Test Testing" />);

        fillAndSubmitForm();

        return waitFor(() => {
            expect(generateBasicTemplate).toHaveBeenCalledWith({
                channel: ChannelType.Helpline,
                date: '2021-01-01',
                details: 'some details',
                general: 'some general text',
                hasOffer: false,
                name: 'Test Testing',
                sex: Salutation.Man,
                type: CustomerType.Business,
            });
        });
    });

    it('should show a toast message with error if occurred', () => {
        generateBasicTemplate.mockImplementation(() => {
            throw new Error('error!');
        });

        render(<Basic name="Test Testing" />);

        fillAndSubmitForm({ ...defaultValues, sex: '' });
        const cogoToastSpy = jest.spyOn(cogoToast, 'error');

        return waitFor(() => {
            expect(cogoToastSpy).toHaveBeenCalledWith('error!');
        });
    });
});
