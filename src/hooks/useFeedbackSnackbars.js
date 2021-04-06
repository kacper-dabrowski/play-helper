import { useEffect, useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import snackbarConfig, { snackbarTypes } from '../libs/snackbar';

const useFeedbackSnackbars = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [openErrorSnackbar] = useSnackbar(snackbarConfig(snackbarTypes.ERROR));
    const [openSuccessSnackbar] = useSnackbar(snackbarConfig(snackbarTypes.SUCCESS));

    useEffect(() => {
        if (error) {
            openErrorSnackbar(error);
            setError('');
        }
        if (success) {
            openSuccessSnackbar(success);
            setSuccess('');
        }
    }, [success, error]);

    return [setSuccess, setError];
};

export default useFeedbackSnackbars;
