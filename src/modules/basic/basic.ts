import { ChannelType, CustomerType, Salutation } from '../../shared/identifiers';
import { convertDate } from '../../shared/utils';
import { convertChannelToString, convertTypeToString, getTemplateString } from './basicModules';

interface GenerateBasicTemplateDto {
    name: string;
    sex?: Salutation;
    type?: CustomerType;
    channel?: ChannelType;
    general?: string;
    details?: string;
    hasOffer?: boolean;
    date?: string;
}

export interface BasicTemplateOptions {
    name: string;
    sex: string;
    type: string;
    channel: string;
    general: string;
    details: string;
    hasOffer: boolean;
    date: string;
}

export const generateBasicTemplate = ({
    name,
    sex,
    type,
    channel,
    date,
    general,
    details,
    hasOffer = false,
}: GenerateBasicTemplateDto) => {
    if (!sex) {
        throw new Error('Nie ustawiono płci!');
    }

    if (!type) {
        throw new Error('Nie ustawiono typu klienta!');
    }
    const convertedType = convertTypeToString(type);

    if (!channel) {
        throw new Error('Nie ustawiono kanału wpływu!');
    }

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
    const basicTemplateConfiguration: BasicTemplateOptions = {
        name,
        sex,
        general,
        date: convertedDate,
        channel: convertedChannel,
        details,
        type: convertedType,
        hasOffer,
    };

    return getTemplateString(basicTemplateConfiguration);
};

export const generateTelephoneTemplate = () => `Witam,
uprzejmie informuję, że sprawa została wyjaśniona podczas rozmowy telefonicznej.
Z poważaniem,
Obsługa Klienta Play`;
