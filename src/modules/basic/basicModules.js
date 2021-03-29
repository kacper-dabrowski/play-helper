import config from '../../shared/identifiers';

export const convertTypeToString = (type) => {
    switch (type) {
        case config.type.individual:
            return '790 500 500';

        case config.type.business:
            return '790 600 600';
        default:
            throw new Error('Nie ustawiono typu klienta!');
    }
};

export const convertChannelToString = (channel) => {
    switch (channel) {
        case config.channel.chat:
            return 'czatu';
        case config.channel.helpline:
            return 'Infolinii Play';
        case config.channel.pos:
            return 'Punktu Obsługi Play';
        default:
            throw new Error('Nie ustawiono kanału wpływu!');
    }
};

export const getTemplateString = ({
    name,
    sex,
    general,
    convertedDate,
    convertedChannel,
    details,
    convertedType,
    hasOffer,
}) => {
    if (sex === config.sex.man) {
        return `Szanowny Panie,

dziękuję za zgłoszenie, które dotyczyło ${general}.

Otrzymałem je ${convertedDate} za pośrednictwem ${convertedChannel}.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że ${details}.

Pomocne informacje:
Jeśli ma Pan pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Pana dyspozycji pod numerem ${convertedType}.
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
    if (sex === config.sex.woman) {
        return `Szanowna Pani,

dziękuję za zgłoszenie, które dotyczyło ${general}.

Otrzymałem je ${convertedDate} za pośrednictwem ${convertedChannel}.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że ${details}.

Pomocne informacje:
Jeśli ma Pani pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Pani dyspozycji pod numerem ${convertedType}.
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
    if (sex === config.sex.company) {
        return `Szanowni Państwo,

dziękuję za zgłoszenie, które dotyczyło ${general}.

Otrzymałem je ${convertedDate} za pośrednictwem ${convertedChannel}.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że ${details}.

Pomocne informacje:
Jeśli mają Państwo pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Państwa dyspozycji pod numerem ${convertedType}.
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
