import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import SettingsForm from './SettingsForm';
import { createRequestStatus, requestFinishedWithError } from '../../../shared/requestStatus/requestStatus';
import { toastProvider } from '../../../libs/toast';

describe('Forms - Settings form', () => {
    const onSettingsUpdateMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should display the component correctly', () => {
        render(getComponentWithProps());

        expect(getFormHeader()).toBeInTheDocument();
        expect(getFormLabel()).toBeInTheDocument();
        expect(getSelectInput()).toBeInTheDocument();
    });

    it('should display initial value from store', () => {
        const userSettingsWithInitialValue = {
            startingPage: '/support/double-closed',
        };

        render(getComponentWithProps({ ...defaultProps, userSettings: userSettingsWithInitialValue }));

        expect(getSelectInput()).toHaveValue('/support/double-closed');
    });

    it('should display default value if initial value is unknown', () => {
        render(getComponentWithProps());

        expect(getSelectInput()).toHaveValue('/support/basic');
    });

    it('should call settings update mock and show toast if it was successful', () => {
        const toastProviderSpy = jest.spyOn(toastProvider, 'success');
        render(getComponentWithProps());

        userEvent.selectOptions(getSelectInput(), '/support/double-opened');

        return waitFor(() => {
            expect(onSettingsUpdateMock).toHaveBeenCalledWith({ settings: { startingPage: '/support/double-opened' } });
            expect(toastProviderSpy).toHaveBeenCalledWith('Pomyślnie zapisano ustawienie');
        });
    });

    it('should call settings update mock and show error toast if it was not successful', () => {
        const toastProviderSpy = jest.spyOn(toastProvider, 'error');

        const { rerender } = render(getComponentWithProps());

        userEvent.selectOptions(getSelectInput(), '/support/double-opened');

        rerender(getComponentWithProps({ ...defaultProps, settingsUpdateRequest: requestFinishedWithError('error!') }));

        return waitFor(() => {
            expect(onSettingsUpdateMock).toHaveBeenCalledWith({ settings: { startingPage: '/support/double-opened' } });
            expect(toastProviderSpy).toHaveBeenCalledWith('error!');
        });
    });

    const defaultProps = {
        onSettingsUpdate: onSettingsUpdateMock,
        userSettings: {
            startingPage: 'some-page',
        },
        settingsUpdateRequest: createRequestStatus(),
    };

    function getComponentWithProps(props = defaultProps) {
        return <SettingsForm {...props} />;
    }

    function getFormHeader() {
        return screen.getByText('Ustawienia użytkownika');
    }

    function getFormLabel() {
        return screen.getByText('Strona startowa');
    }

    function getSelectInput() {
        return screen.getByTestId('settings-select');
    }
});
