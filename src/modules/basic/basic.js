import { convertDate } from '../../shared/utils';
import { convertChannelToString, convertTypeToString, getTemplateString } from './basicModules';

export const generateBasicTemplate = ({ name, sex, type, channel, date, general, details, hasOffer = false }) => {
    if (!sex) {
        throw new Error('Nie ustawiono płci!');
    }
    const convertedType = convertTypeToString(type);
    const convertedChannel = convertChannelToString(channel);

    if (!date) {
        throw new Error('Nie ustawiono daty!');
    }

    const convertedDate = convertDate(date);

    if (!details) {
        throw new Error('Nie ustawiono szczegółów zgłoszenia!');
    }

    if (!general) {
        throw new Error('Nie ustawiono ogólnych informacji o zgłoszeniu');
    }
    const basicTemplateConfiguration = {
        name,
        sex,
        general,
        convertedDate,
        convertedChannel,
        details,
        convertedType,
        hasOffer,
    };
    return getTemplateString(basicTemplateConfiguration);
};

export const generateTelephoneTemplate = () => `Witam,
uprzejmie informuję, że sprawa została wyjaśniona podczas rozmowy telefonicznej.
Z poważaniem,
Obsługa Klienta Play`;
