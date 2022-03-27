import { CustomerGender, CustomerType, NotificationChannel } from '../../shared/identifiers';
import { BasicTemplateParams, generateBasicTemplate } from './template';

describe('Basic notification module', () => {
    const employeeName = 'Test Test';

    it('should generate a valid basic template for man, business type and helpline channel with and without offer', () => {
        const templateConfig: BasicTemplateParams = {
            gender: CustomerGender.Man,
            type: CustomerType.Business,
            channel: NotificationChannel.Helpline,
            date: '11-12-2020',
            notificationDescription: 'asd',
            notificationDetails: 'dsa',
            hasOffer: false,
        };

        expect(generateBasicTemplate(employeeName, templateConfig)).toEqual(`Szanowny Panie,

dziękuję za zgłoszenie, które dotyczyło asd.

Otrzymałem je 12 listopada 2020 roku za pośrednictwem Infolinii Play.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że dsa.

Pomocne informacje:
Jeśli ma Pan pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Pana dyspozycji pod numerem 790 600 600.
Będę wdzięczny, jeżeli oceni Pan moją pracę, proszę pamiętać, że ocenia Pan mój wkład w rozwiązanie zgłaszanej kwestii.

Z poważaniem,
Test Test
Obsługa Klienta Play`);
        expect(generateBasicTemplate(employeeName, { ...templateConfig, hasOffer: true })).toEqual(`Szanowny Panie,

dziękuję za zgłoszenie, które dotyczyło asd.

Otrzymałem je 12 listopada 2020 roku za pośrednictwem Infolinii Play.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że dsa.

Pomocne informacje:
Jeśli ma Pan pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Pana dyspozycji pod numerem 790 600 600.
Będę wdzięczny, jeżeli oceni Pan moją pracę, proszę pamiętać, że ocenia Pan mój wkład w rozwiązanie zgłaszanej kwestii.

Zachęcamy do zapoznania się z nowymi ofertami dla stałych Klientów. W przypadku zainteresowania prosimy o wysłanie SMS o treści TELEFON pod numer 8016 - oddzwonimy i dobierzemy ofertę.
Z poważaniem,
Test Test
Obsługa Klienta Play`);
    });
    it(`should generate a valid basic template for woman, business type and helpline channel with and without offer`, () => {
        const templateConfig: BasicTemplateParams = {
            gender: CustomerGender.Woman,
            type: CustomerType.Business,
            channel: NotificationChannel.Helpline,
            date: '11-12-2020',
            notificationDescription: 'asd',
            notificationDetails: 'dsa',
            hasOffer: false,
        };
        expect(generateBasicTemplate(employeeName, templateConfig)).toEqual(`Szanowna Pani,

dziękuję za zgłoszenie, które dotyczyło asd.

Otrzymałem je 12 listopada 2020 roku za pośrednictwem Infolinii Play.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że dsa.

Pomocne informacje:
Jeśli ma Pani pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Pani dyspozycji pod numerem 790 600 600.
Będę wdzięczny, jeżeli oceni Pani moją pracę, proszę pamiętać, że ocenia Pani mój wkład w rozwiązanie zgłaszanej kwestii.

Z poważaniem,
Test Test
Obsługa Klienta Play`);
        expect(generateBasicTemplate(employeeName, { ...templateConfig, hasOffer: true })).toEqual(`Szanowna Pani,

dziękuję za zgłoszenie, które dotyczyło asd.

Otrzymałem je 12 listopada 2020 roku za pośrednictwem Infolinii Play.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że dsa.

Pomocne informacje:
Jeśli ma Pani pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Pani dyspozycji pod numerem 790 600 600.
Będę wdzięczny, jeżeli oceni Pani moją pracę, proszę pamiętać, że ocenia Pani mój wkład w rozwiązanie zgłaszanej kwestii.

Zachęcamy do zapoznania się z nowymi ofertami dla stałych Klientów. W przypadku zainteresowania prosimy o wysłanie SMS o treści TELEFON pod numer 8016 - oddzwonimy i dobierzemy ofertę.
Z poważaniem,
Test Test
Obsługa Klienta Play`);
    });
    it(`should generate a valid basic template for company, business type and helpline channel with and without offer`, () => {
        const templateConfig: BasicTemplateParams = {
            gender: CustomerGender.Company,
            type: CustomerType.Business,
            channel: NotificationChannel.Helpline,
            date: '11-12-2020',
            notificationDescription: 'asd',
            notificationDetails: 'dsa',
            hasOffer: false,
        };
        expect(generateBasicTemplate(employeeName, templateConfig)).toEqual(`Szanowni Państwo,

dziękuję za zgłoszenie, które dotyczyło asd.

Otrzymałem je 12 listopada 2020 roku za pośrednictwem Infolinii Play.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że dsa.

Pomocne informacje:
Jeśli mają Państwo pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Państwa dyspozycji pod numerem 790 600 600.
Będę wdzięczny, jeżeli ocenią Państwo moją pracę, proszę pamiętać, że oceniają Państwo mój wkład w rozwiązanie zgłaszanej kwestii.

Z poważaniem,
Test Test
Obsługa Klienta Play`);
        expect(generateBasicTemplate(employeeName, { ...templateConfig, hasOffer: true })).toEqual(`Szanowni Państwo,

dziękuję za zgłoszenie, które dotyczyło asd.

Otrzymałem je 12 listopada 2020 roku za pośrednictwem Infolinii Play.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że dsa.

Pomocne informacje:
Jeśli mają Państwo pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Państwa dyspozycji pod numerem 790 600 600.
Będę wdzięczny, jeżeli ocenią Państwo moją pracę, proszę pamiętać, że oceniają Państwo mój wkład w rozwiązanie zgłaszanej kwestii.

Zachęcamy do zapoznania się z nowymi ofertami dla stałych Klientów. W przypadku zainteresowania prosimy o wysłanie SMS o treści TELEFON pod numer 8016 - oddzwonimy i dobierzemy ofertę.
Z poważaniem,
Test Test
Obsługa Klienta Play`);
    });
});
