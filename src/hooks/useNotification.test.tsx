import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useErrorNotification, useSuccessNotification } from './useNotification';
import {
    createRequestStatus,
    requestFinishedSuccessfully,
    requestFinishedWithError,
    RequestStatus,
} from '../shared/requestStatus/requestStatus';
import { toastProvider } from '../libs/toast';

describe('hooks - useNotification', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('error', () => {
        it('should display an error if requestStatus has one', () => {
            const toastProviderSpy = jest.spyOn(toastProvider, 'error');

            render(getComponentWithProps({ requestStatus: requestFinishedWithError('error') }));

            return waitFor(() => {
                expect(toastProviderSpy).toHaveBeenCalledWith('error');
            });
        });

        it('should not display an error if requestStatus does not have one', () => {
            const toastProviderSpy = jest.spyOn(toastProvider, 'error');

            render(getComponentWithProps({ requestStatus: createRequestStatus() }));

            return waitFor(() => {
                expect(toastProviderSpy).not.toHaveBeenCalled();
            });
        });
    });

    describe('success', () => {
        it('should display a success toast if request finished with success', () => {
            const toastProviderSpy = jest.spyOn(toastProvider, 'success');

            render(getComponentWithProps({ requestStatus: requestFinishedSuccessfully() }));

            return waitFor(() => {
                expect(toastProviderSpy).toHaveBeenCalledWith('Operacja zakończona powodzeniem');
            });
        });

        it('should display a success toast with custom message if request finished with success', () => {
            const toastProviderSpy = jest.spyOn(toastProvider, 'success');

            render(
                getComponentWithProps({ requestStatus: requestFinishedSuccessfully(), customMessage: 'Custom message' })
            );

            return waitFor(() => {
                expect(toastProviderSpy).toHaveBeenCalledWith('Custom message');
            });
        });

        it('should not display an error if request finished with error', () => {
            const toastProviderSpy = jest.spyOn(toastProvider, 'success');

            render(getComponentWithProps({ requestStatus: requestFinishedWithError('error') }));

            return waitFor(() => {
                expect(toastProviderSpy).not.toHaveBeenCalled();
            });
        });
    });

    function getComponentWithProps({
        requestStatus = createRequestStatus(),
        customMessage,
    }: {
        requestStatus: RequestStatus;
        customMessage?: string;
    }) {
        return <FakeComponent requestStatus={requestStatus} customMessage={customMessage} />;
    }

    const FakeComponent = ({
        requestStatus,
        customMessage = '',
    }: {
        requestStatus: RequestStatus;
        // eslint-disable-next-line react/require-default-props
        customMessage?: string;
    }) => {
        useErrorNotification(requestStatus);
        useSuccessNotification(requestStatus, customMessage);
        return <div />;
    };
});
