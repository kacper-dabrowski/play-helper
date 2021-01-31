export const generateMessageByCode = (code) => {
  switch (code) {
    case 400:
      return `Podane dane nie są prawidłowe`;
    default:
      return `Wystąpił nieznany błąd`;
  }
};
