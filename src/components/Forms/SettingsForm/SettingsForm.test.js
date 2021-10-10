import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import cogoToast from 'cogo-toast';
import SettingsForm from './SettingsForm';
import { createRequestStatus, requestFinishedWithError } from '../../../shared/requestStatus/requestStatus';

describe('Forms - Settings form', () => {
    const onSettingsUpdateMock = jest.fn();
    const userSettings = {
        startingPage: 'some-page',
    };

    it('should display the component correctly', () => {
        const fakeRequestStatus = createRequestStatus();
        render(
            <SettingsForm
                onSettingsUpdate={onSettingsUpdateMock}
                userSettings={userSettings}
                settingsUpdateRequest={fakeRequestStatus}
            />
        );

        expect(getFormHeader()).toBeInTheDocument();
        expect(getFormLabel()).toBeInTheDocument();
        expect(getSelectInput()).toBeInTheDocument();
    });

    it('should display initial value from store', () => {
        const fakeRequestStatus = createRequestStatus();
        const userSettingsWithInitialValue = {
            startingPage: '/support/double-closed',
        };

        render(
            <SettingsForm
                onSettingsUpdate={onSettingsUpdateMock}
                userSettings={userSettingsWithInitialValue}
                settingsUpdateRequest={fakeRequestStatus}
            />
        );

        expect(getSelectInput()).toHaveValue('/support/double-closed');
    });

    it('should display default value if initial value is unknown', () => {
        const fakeRequestStatus = createRequestStatus();

        render(
            <SettingsForm
                onSettingsUpdate={onSettingsUpdateMock}
                userSettings={userSettings}
                settingsUpdateRequest={fakeRequestStatus}
            />
        );

        expect(getSelectInput()).toHaveValue('/support/basic');
    });

    it('should call settings update mock and show toast if it was successful', () => {
        const fakeRequestStatus = createRequestStatus();
        render(
            <SettingsForm
                onSettingsUpdate={onSettingsUpdateMock}
                userSettings={userSettings}
                settingsUpdateRequest={fakeRequestStatus}
            />
        );

        userEvent.selectOptions(getSelectInput(), '/support/double-opened');

        const cogoToastSpy = jest.spyOn(cogoToast, 'success');

        return waitFor(() => {
            expect(onSettingsUpdateMock).toHaveBeenCalledWith({ settings: { startingPage: '/support/double-opened' } });
            expect(cogoToastSpy).toHaveBeenCalledWith('Pomyślnie zapisano ustawienie');
        });
    });

    it('should call settings update mock and show error toast if it was not successful', () => {
        const fakeRequestStatus = createRequestStatus();
        const cogoToastSpy = jest.spyOn(cogoToast, 'error');

        const { rerender } = render(
            <SettingsForm
                onSettingsUpdate={onSettingsUpdateMock}
                userSettings={userSettings}
                settingsUpdateRequest={fakeRequestStatus}
            />
        );

        userEvent.selectOptions(getSelectInput(), '/support/double-opened');

        rerender(
            <SettingsForm
                onSettingsUpdate={onSettingsUpdateMock}
                userSettings={userSettings}
                settingsUpdateRequest={requestFinishedWithError('error')}
            />
        );

        return waitFor(() => {
            expect(onSettingsUpdateMock).toHaveBeenCalledWith({ settings: { startingPage: '/support/double-opened' } });
            expect(cogoToastSpy).toHaveBeenCalledWith('error');
        });
    });

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
