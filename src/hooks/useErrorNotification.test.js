import React from 'react';
import cogoToast from 'cogo-toast';
import { render, waitFor } from '@testing-library/react';
import { useErrorNotification } from './useErrorNotification';
import { createRequestStatus, requestFinishedWithError } from '../shared/requestStatus/requestStatus';

describe('hooks - useErrorNotification', () => {
    it('should display an error if requestStatus has one', () => {
        const cogoToastSpy = jest.spyOn(cogoToast, 'error');

        render(getComponentWithProps({ requestStatus: requestFinishedWithError('error') }));

        return waitFor(() => {
            expect(cogoToastSpy).toHaveBeenCalledWith('error');
        });
    });

    it('should not display an error if requestStatus has one', () => {
        const cogoToastSpy = jest.spyOn(cogoToast, 'error');

        render(getComponentWithProps());

        return waitFor(() => {
            expect(cogoToastSpy).not.toHaveBeenCalled();
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
