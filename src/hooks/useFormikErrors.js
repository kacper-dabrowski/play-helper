import { useEffect } from 'react';
import { getLastMessageFromFormikErrors } from '../shared/errors/handleErrors';
import useFeedbackSnackbars from './useFeedbackSnackbars';

const useFormikErrors = (formikErrors) => {
    const [, setError] = useFeedbackSnackbars();
    useEffect(() => {
        if (Object.keys(formikErrors).length !== 0) {
            const formikError = getLastMessageFromFormikErrors(formikErrors);
            setError(formikError);
        }
    });
};

export default useFormikErrors;
