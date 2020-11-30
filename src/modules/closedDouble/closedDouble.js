const generateClosedDoubleTemplate = (numOfCurrent, numOfClosed) => {
  if (!numOfCurrent || !numOfClosed) {
    throw new Error("Nie ustawiono jednego z numerów zgloszeń!");
  }
  return `Dziękujemy za zgłoszenie ${numOfCurrent}. Informujemy, że odpowiedź zostanie udzielona w zgłoszeniu ${numOfClosed}, w którym poruszone są te same kwestie.
  
Z poważaniem,
Obsługa Klienta Play`;
};
export default generateClosedDoubleTemplate;
