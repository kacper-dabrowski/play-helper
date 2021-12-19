import { ChannelType, CustomerType, Salutation } from '../../shared/identifiers';
import { BasicTemplateOptions } from './basic';

export const convertTypeToString = (type: CustomerType) => {
    switch (type) {
        case CustomerType.Individual:
            return '790 500 500';

        case CustomerType.Business:
            return '790 600 600';
        default:
            throw new Error('Nie ustawiono typu klienta!');
    }
};

export const convertChannelToString = (channel: ChannelType) => {
    switch (channel) {
        case ChannelType.Chat:
            return 'czatu';
        case ChannelType.Helpline:
            return 'Infolinii Play';
        case ChannelType.Pos:
            return 'Punktu Obsługi Play';
        default:
            throw new Error('Nie ustawiono kanału wpływu!');
    }
};

export const getTemplateString = ({
    name,
    sex,
    general,
    date,
    channel,
    details,
    type,
    hasOffer,
}: BasicTemplateOptions) => {
    if (sex === Salutation.Man) {
        return `Szanowny Panie,

dziękuję za zgłoszenie, które dotyczyło ${general}.

Otrzymałem je ${date} za pośrednictwem ${channel}.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że ${details}.

Pomocne informacje:
Jeśli ma Pan pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Pana dyspozycji pod numerem ${type}.
Będę wdzięczny, jeżeli oceni Pan moją pracę, proszę pamiętać, że ocenia Pan mój wkład w rozwiązanie zgłaszanej kwestii.
${
    hasOffer
        ? `
Zachęcamy do zapoznania się z nowymi ofertami dla stałych Klientów. W przypadku zainteresowania prosimy o wysłanie SMS o treści TELEFON pod numer 8016 - oddzwonimy i dobierzemy ofertę.`
        : ''
}
Z poważaniem,
${name}
Obsługa Klienta Play`;
    }
    if (sex === Salutation.Woman) {
        return `Szanowna Pani,

dziękuję za zgłoszenie, które dotyczyło ${general}.

Otrzymałem je ${date} za pośrednictwem ${channel}.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że ${details}.

Pomocne informacje:
Jeśli ma Pani pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Pani dyspozycji pod numerem ${type}.
Będę wdzięczny, jeżeli oceni Pani moją pracę, proszę pamiętać, że ocenia Pani mój wkład w rozwiązanie zgłaszanej kwestii.
${
    hasOffer
        ? `
Zachęcamy do zapoznania się z nowymi ofertami dla stałych Klientów. W przypadku zainteresowania prosimy o wysłanie SMS o treści TELEFON pod numer 8016 - oddzwonimy i dobierzemy ofertę.`
        : ''
}
Z poważaniem,
${name}
Obsługa Klienta Play`;
    }
    if (sex === Salutation.Company) {
        return `Szanowni Państwo,

dziękuję za zgłoszenie, które dotyczyło ${general}.

Otrzymałem je ${date} za pośrednictwem ${channel}.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że ${details}.

Pomocne informacje:
Jeśli mają Państwo pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Państwa dyspozycji pod numerem ${type}.
Będę wdzięczny, jeżeli ocenią Państwo moją pracę, proszę pamiętać, że oceniają Państwo mój wkład w rozwiązanie zgłaszanej kwestii.
${
    hasOffer
        ? `
Zachęcamy do zapoznania się z nowymi ofertami dla stałych Klientów. W przypadku zainteresowania prosimy o wysłanie SMS o treści TELEFON pod numer 8016 - oddzwonimy i dobierzemy ofertę.`
        : ''
}
Z poważaniem,
${name}
Obsługa Klienta Play`;
    }
    throw new Error('Wystąpił błąd, sprawdź ustawienia płci i spróbuj ponownie.');
};
