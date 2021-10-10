import { useEffect } from 'react';
import cogoToast from 'cogo-toast';

export const useErrorNotification = (requestStatus) => {
    useEffect(() => {
        if (requestStatus.error) {
            cogoToast.error(requestStatus.error);
        }
    }, [requestStatus.error]);
};
