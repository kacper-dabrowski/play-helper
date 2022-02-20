import { useEffect } from 'react';
import { toastProvider } from '../libs/toast';
import { RequestStatus } from '../shared/requestStatus/requestStatus';

export const useErrorNotification = (requestStatus: RequestStatus): void => {
    useEffect(() => {
        if (requestStatus.error) {
            toastProvider.error(requestStatus.error);
        }
    }, [requestStatus.error]);
};

export const useSuccessNotification = (requestStatus: RequestStatus, message?: string): void => {
    useEffect(() => {
        if (requestStatus.success) {
            toastProvider.success(message || 'Operacja zakończona powodzeniem');
        }
    }, [message, requestStatus.success]);
};

export const useNotifications = (requestStatus: RequestStatus, successMessage?: string): void => {
    useErrorNotification(requestStatus);
    useSuccessNotification(requestStatus, successMessage);
};
