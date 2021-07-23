export const getLastMessageFromFormikErrors = (formikErrors) => {
    const formikErrorsKeys = Object.keys(formikErrors);

    if (formikErrorsKeys.length === 0) {
        return;
    }

    const errorsArray = formikErrorsKeys.map((errorKey) => formikErrors[errorKey]);

    return errorsArray.pop();
};
