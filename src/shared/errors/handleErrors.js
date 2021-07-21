export const generateMessageByCode = (code) => {
    switch (code) {
        case 400:
            return `Podane dane nie są prawidłowe`;
        default:
            return `Wystąpił nieznany błąd`;
    }
};

export const getLastMessageFromFormikErrors = (formikErrors) => {
    if (!formikErrors) {
        return;
    }

    const formikErrorsKeys = Object.keys(formikErrors);

    const errorsArray = formikErrorsKeys.map((errorKey) => formikErrors[errorKey]);
    const currentError = errorsArray.pop();
    return currentError;
};
