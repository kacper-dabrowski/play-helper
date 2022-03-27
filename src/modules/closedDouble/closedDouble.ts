import { CustomerGender } from '../../shared/identifiers';

export const generateClosedDoubleTemplate = (
    gender: CustomerGender,
    numOfCurrent: string,
    numOfClosed: string
): string => {
    if (!numOfCurrent || !numOfClosed) {
        throw new Error('Nie ustawiono jednego z numerów zgłoszeń!');
    }

    switch (gender) {
        case CustomerGender.Man:
            return `Dziękujemy za zgłoszenie ${numOfCurrent} Poruszane przez Pana kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie ${numOfClosed}.

Z poważaniem, 
Obsługa Klienta Play`;
        case CustomerGender.Woman:
            return `Dziękujemy za zgłoszenie ${numOfCurrent}. Poruszane przez Panią kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie ${numOfClosed}.
      
Z poważaniem, 
Obsługa Klienta Play`;
        case CustomerGender.Company:
            return `Dziękujemy za zgłoszenie ${numOfCurrent}. Poruszane przez Państwa kwestie zostały już wyjaśnione w odpowiedzi na zgłoszenie ${numOfClosed}.

Z poważaniem,
Obsługa Klienta Play`;
        default:
            throw new Error('Nie ustawiono płci!');
    }
};
