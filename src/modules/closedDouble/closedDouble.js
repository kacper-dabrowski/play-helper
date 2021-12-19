const generateOpenedDoubleTemplate = (numOfCurrent, numOfOpened) => {
    if (!numOfCurrent || !numOfOpened) {
        throw new Error('Nie ustawiono jednego z numerów zgloszeń!');
    }
    // eslint-disable-next-line max-len
    return `Dziękujemy za zgłoszenie ${numOfCurrent}. Informujemy, że odpowiedź zostanie udzielona w zgłoszeniu ${numOfOpened}, w którym poruszone są te same kwestie.
  
Z poważaniem,
Obsługa Klienta Play`;
};
export default generateOpenedDoubleTemplate;
