import { CustomerGender, CustomerType, NotificationChannel } from '../../shared/identifiers';
import { Maybe } from '../../shared/types/types';
import { convertDate } from '../../shared/utils';

export interface BasicTemplateParams {
    gender: Maybe<CustomerGender>;
    type: Maybe<CustomerType>;
    channel: Maybe<NotificationChannel>;
    date: Maybe<string>;
    notificationDescription: Maybe<string>;
    notificationDetails: Maybe<string>;
    hasOffer: Maybe<boolean>;
}

export const generateBasicTemplate = (
    employeeName: string,
    { gender, date, type, channel, notificationDetails, notificationDescription, hasOffer }: BasicTemplateParams
) => {
    if (!gender) {
        throw new Error('Nie ustawiono płci!');
    }

    if (!type) {
        throw new Error('Nie ustawiono typu klienta!');
    }

    if (!channel) {
        throw new Error('Nie ustawiono kanału wpływu!');
    }

    if (!date) {
        throw new Error('Nie ustawiono daty!');
    }

    if (!notificationDetails) {
        throw new Error('Nie ustawiono szczegółów zgłoszenia!');
    }

    if (!notificationDescription) {
        throw new Error('Nie ustawiono ogólnych informacji o zgłoszeniu');
    }

    const convertedType = convertTypeToString(type);
    const convertedChannel = convertChannelToString(channel);

    const convertedDate = convertDate(date);

    const basicTemplateConfiguration: TemplateStringParams = {
        gender,
        notificationDescription,
        convertedDate,
        convertedChannel,
        notificationDetails,
        convertedType,
        hasOffer: Boolean(hasOffer),
        employeeName,
    };
    return getTemplateString(basicTemplateConfiguration);
};

export function generateTelephoneTemplate() {
    return `Witam,
uprzejmie informuję, że sprawa została wyjaśniona podczas rozmowy telefonicznej.
Z poważaniem,
Obsługa Klienta Play`;
}

const convertTypeToString = (type: CustomerType) => {
    switch (type) {
        case CustomerType.Individual:
            return '790 500 500';

        case CustomerType.Business:
            return '790 600 600';
        default:
            throw new Error('Nie ustawiono typu klienta!');
    }
};

const convertChannelToString = (channel: NotificationChannel) => {
    switch (channel) {
        case NotificationChannel.Chat:
            return 'czatu';
        case NotificationChannel.Helpline:
            return 'Infolinii Play';
        case NotificationChannel.SalesServicePoint:
            return 'Punktu Obsługi Play';
        default:
            throw new Error('Nie ustawiono kanału wpływu!');
    }
};

interface TemplateStringParams {
    gender: CustomerGender;
    convertedDate: string;
    convertedType: string;
    convertedChannel: string;
    notificationDetails: string;
    notificationDescription: string;
    hasOffer: boolean;
    employeeName: string;
}

const getTemplateString = ({
    gender,
    convertedDate,
    convertedType,
    convertedChannel,
    notificationDescription,
    notificationDetails,
    hasOffer,
    employeeName,
}: TemplateStringParams): string => {
    if (gender === CustomerGender.Man) {
        return `Szanowny Panie,

dziękuję za zgłoszenie, które dotyczyło ${notificationDescription}.

Otrzymałem je ${convertedDate} za pośrednictwem ${convertedChannel}.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że ${notificationDetails}.

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
${employeeName}
Obsługa Klienta Play`;
    }
    if (gender === CustomerGender.Woman) {
        return `Szanowna Pani,

dziękuję za zgłoszenie, które dotyczyło ${notificationDescription}.

Otrzymałem je ${convertedDate} za pośrednictwem ${convertedChannel}.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że ${notificationDetails}.

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
${employeeName}
Obsługa Klienta Play`;
    }
    if (gender === CustomerGender.Company) {
        return `Szanowni Państwo,

dziękuję za zgłoszenie, które dotyczyło ${notificationDescription}.

Otrzymałem je ${convertedDate} za pośrednictwem ${convertedChannel}.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że ${notificationDetails}.

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
${employeeName}
Obsługa Klienta Play`;
    }
    throw new Error('Wystąpił błąd, sprawdź ustawienia płci i spróbuj ponownie.');
};
