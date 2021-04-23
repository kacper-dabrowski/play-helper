import cogoToast from 'cogo-toast';
import { useEffect } from 'react';
import { generateMessageByCode, getLastMessageFromFormikErrors } from '../shared/errors/handleErrors';

const useError = (formikErrors, requestError) => {
    useEffect(() => {
        if (requestError) {
            cogoToast.error(generateMessageByCode(requestError));
        }

        if (getLastMessageFromFormikErrors(formikErrors)) {
            cogoToast.error(getLastMessageFromFormikErrors(formikErrors));
        }
    }, [formikErrors, requestError]);
};

export default useError;
