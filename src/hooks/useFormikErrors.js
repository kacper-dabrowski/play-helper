import cogoToast from 'cogo-toast';
import { useEffect } from 'react';
import { getLastMessageFromFormikErrors } from '../shared/errors/handleErrors';

const useFormikErrors = (formikErrors) => {
    useEffect(() => {
        if (Object.keys(formikErrors).length !== 0) {
            const formikError = getLastMessageFromFormikErrors(formikErrors);
            cogoToast.error(formikError);
        }
    });
};

export default useFormikErrors;
