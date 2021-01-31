export const generateMessageByCode = (code) => {
  switch (code) {
    case 400:
      return `Podane dane nie są prawidłowe`;
    default:
      return `Wystąpił nieznany błąd`;
  }
};

export const getLastMessageFromFormikErrors = (formikErrors) => {
  const errorsArray = [];
  for (const key in formikErrors) {
    errorsArray.push(formikErrors[key]);
  }
  const currentError = errorsArray.pop();
  return currentError;
};
