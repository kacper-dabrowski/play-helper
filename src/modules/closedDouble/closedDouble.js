import config from '../../shared/identifiers';

export const generateClosedDoubleTemplate = (sex, numOfCurrent, numOfClosed) => {
    if (!numOfCurrent || !numOfClosed) {
        throw new Error('Nie ustawiono jednego z numerów zgłoszeń!');
    }

    switch (sex) {
        case config.sex.man:
            return `Dziękujemy za zgłoszenie ${numOfCurrent} Poruszane przez Pana kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie ${numOfClosed}.

Z poważaniem, 
Obsługa Klienta Play`;
        case config.sex.woman:
            return `Dziękujemy za zgłoszenie ${numOfCurrent}. Poruszane przez Panią kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie ${numOfClosed}.
      
Z poważaniem, 
Obsługa Klienta Play`;
        case config.sex.company:
            return `Dziękujemy za zgłoszenie ${numOfCurrent}. Poruszane przez Państwa kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie ${numOfClosed}.

Z poważaniem,
Obsługa Klienta Play`;
        default:
            throw new Error('Nie ustawiono płci!');
    }
};
