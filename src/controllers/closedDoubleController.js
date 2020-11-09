const generateClosedDoubleTemplate = (numOfCurrent, numOfClosed) => {
  return `Dziękujemy za zgłoszenie ${numOfCurrent}. Informujemy, że odpowiedź zostanie udzielona w zgłoszeniu ${numOfClosed}, w którym poruszone są te same kwestie. Z poważaniem,
  Obsługa Klienta Play`;
};
export default generateClosedDoubleTemplate;
