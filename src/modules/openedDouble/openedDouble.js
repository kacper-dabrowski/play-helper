import { Salutation } from '../../shared/identifiers';

const generateClosedDoubleTemplate = (sex, numOfCurrent, numOfClosed) => {
    if (!numOfCurrent || !numOfClosed) {
        throw new Error('Nie ustawiono jednego z numerów zgłoszeń!');
    }

    switch (sex) {
        case Salutation.Man:
            return `Dziękujemy za zgłoszenie ${numOfCurrent} Poruszane przez Pana kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie ${numOfClosed}.

Z poważaniem, 
Obsługa Klienta Play`;
        case Salutation.Woman:
            return `Dziękujemy za zgłoszenie ${numOfCurrent}. Poruszane przez Panią kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie ${numOfClosed}.
      
Z poważaniem, 
Obsługa Klienta Play`;
        case Salutation.Company:
            return `Dziękujemy za zgłoszenie ${numOfCurrent}. Poruszane przez Państwa kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie ${numOfClosed}.

Z poważaniem,
Obsługa Klienta Play`;
        default:
            throw new Error('Nie ustawiono płci!');
    }
};

export default generateClosedDoubleTemplate;
