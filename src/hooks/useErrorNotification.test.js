import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useErrorNotification } from './useErrorNotification';
import { createRequestStatus, requestFinishedWithError } from '../shared/requestStatus/requestStatus';
import { toastProvider } from '../libs/toast';

describe('hooks - useErrorNotification', () => {
    it('should display an error if requestStatus has one', () => {
        const toastProviderSpy = jest.spyOn(toastProvider, 'error');

        render(getComponentWithProps({ requestStatus: requestFinishedWithError('error') }));

        return waitFor(() => {
            expect(toastProviderSpy).toHaveBeenCalledWith('error');
        });
    });

    it('should not display an error if requestStatus has one', () => {
        const toastProviderSpy = jest.spyOn(toastProvider, 'error');

        render(getComponentWithProps());

        return waitFor(() => {
            expect(toastProviderSpy).not.toHaveBeenCalled();
        });
    });

    function getComponentWithProps({ requestStatus } = { requestStatus: createRequestStatus() }) {
        return <FakeComponent requestStatus={requestStatus} />;
    }

    const FakeComponent = ({ requestStatus }) => {
        useErrorNotification(requestStatus);
        return <div />;
    };
});
