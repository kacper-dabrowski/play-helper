import cogoToast from 'cogo-toast';
import { useEffect } from 'react';
import { getLastMessageFromFormikErrors } from '../shared/errors/handleErrors';

const useFormikError = (formikErrors, requestError) => {
    useEffect(() => {
        if (getLastMessageFromFormikErrors(formikErrors)) {
            cogoToast.error(getLastMessageFromFormikErrors(formikErrors));
        }
    }, [formikErrors, requestError]);
};

export default useFormikError;
