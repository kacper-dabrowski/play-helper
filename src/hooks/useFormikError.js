import { useEffect } from 'react';
import { toastProvider } from '../libs/toast';
import { getLastMessageFromFormikErrors } from '../shared/errors/handleErrors';

export const useFormikError = (formikErrors, requestError) => {
    useEffect(() => {
        if (getLastMessageFromFormikErrors(formikErrors)) {
            toastProvider.error(getLastMessageFromFormikErrors(formikErrors));
        }
    }, [formikErrors, requestError]);
};
