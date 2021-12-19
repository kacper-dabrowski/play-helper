import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import cogoToast from 'cogo-toast';
import Double from './Double';
import config from '../../../shared/identifiers';
import generateOpenedDoubleTemplate from '../../../modules/closedDouble/closedDouble';
import generateClosedDoubleTemplate from '../../../modules/openedDouble/openedDouble';

jest.mock('../../../modules/closedDouble/closedDouble', () => jest.fn());
jest.mock('../../../modules/openedDouble/openedDouble', () => jest.fn());

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

describe('Support - Double', () => {
    it('should render additional gender setting buttons if double is closed', () => {
        render(<Double type={config.double.closed} />);

        expect(screen.getByText('Mężczyzna')).toBeInTheDocument();
    });

    it('should not render additional gender setting buttons if double is opened', () => {
        render(<Double type={config.double.opened} />);

        expect(screen.queryByText('Mężczyzna')).not.toBeInTheDocument();
    });

    it('should call generate double opened template on confirm button click', () => {
        render(<Double type={config.double.opened} />);

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

        render(<Double type={config.double.opened} />);

        fillAndSubmitForm();

        userEvent.click(screen.getByText('Zatwierdź'));
        const errorToastSpy = jest.spyOn(cogoToast, 'error');

        return waitFor(() => {
            expect(errorToastSpy).toHaveBeenCalledWith('error!');
        });
    });

    it('should show a toast message, when generate template for double closed fails', () => {
        generateClosedDoubleTemplate.mockImplementation(() => {
            throw new Error('error!');
        });

        render(<Double type={config.double.closed} />);

        fillAndSubmitForm({ ...defaultValues, sex: 'Mężczyzna' });

        userEvent.click(screen.getByText('Zatwierdź'));
        const errorToastSpy = jest.spyOn(cogoToast, 'error');

        return waitFor(() => {
            expect(errorToastSpy).toHaveBeenCalledWith('error!');
        });
    });

    it('should call generate double closed template on confirm button click', () => {
        render(<Double type={config.double.closed} />);

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
});
