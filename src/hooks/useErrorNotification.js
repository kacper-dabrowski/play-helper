import { useEffect } from 'react';
import { toastProvider } from '../libs/toast';

export const useErrorNotification = (requestStatus) => {
    useEffect(() => {
        if (requestStatus.error) {
            toastProvider.error(requestStatus.error);
        }
    }, [requestStatus.error]);
};
