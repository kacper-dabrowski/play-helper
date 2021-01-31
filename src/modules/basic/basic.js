import config from "../../shared/identifiers";
import { convertDate } from "../../shared/utils";

export const generateBasicTemplate = ({
  name,
  sex,
  type,
  channel,
  date,
  general,
  details,
  hasOffer = false,
}) => {
  let template;
  let convertedType;
  let convertedChannel;

  if (!sex) {
    throw new Error("Nie ustawiono płci!");
  }

  switch (type) {
    case config.type.individual:
      convertedType = "790 500 500";
      break;
    case config.type.business:
      convertedType = "790 600 600";
      break;
    default:
      throw new Error("Nie ustawiono typu klienta!");
  }

  switch (channel) {
    case config.channel.chat:
      convertedChannel = "czatu";
      break;
    case config.channel.helpline:
      convertedChannel = "Infolinii Play";
      break;
    case config.channel.pos:
      convertedChannel = "Punktu Obsługi Play";
      break;
    default:
      throw new Error("Nie ustawiono kanału wpływu!");
  }

  if (!date) {
    throw new Error("Nie ustawiono daty!");
  }

  const convertedDate = convertDate(date);

  if (!details) {
    throw new Error("Nie ustawiono szczegółów zgłoszenia!");
  }

  if (!general) {
    throw new Error("Nie ustawiono ogólnych informacji o zgłoszeniu");
  }

  if (sex === config.sex.man) {
    template = `Szanowny Panie,

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
    : ""
}
Z poważaniem,
${name}
Obsługa Klienta Play`;
  }
  if (sex === config.sex.woman) {
    template = `Szanowny Panie,
 
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
Zachęcamy do zapoznania się z nowymi ofertami dla stałych Klientów. W przypadku zainteresowania prosimy o wysłanie SMS o treści TELEFON pod numer 8016 - oddzwonimy i dobierzemy ofertę.
    `
    : ""
}
Z poważaniem,
${name}
Obsługa Klienta Play
      `;
  }
  if (sex === config.sex.company) {
    template = `Szanowny Panie,
 
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
Zachęcamy do zapoznania się z nowymi ofertami dla stałych Klientów. W przypadku zainteresowania prosimy o wysłanie SMS o treści TELEFON pod numer 8016 - oddzwonimy i dobierzemy ofertę.
    `
    : ""
}
Z poważaniem,
${name}
Obsługa Klienta Play
      `;
  }

  return template;
};

export const generateTelephoneTemplate = () => `Witam,
uprzejmie informuję, że sprawa została wyjaśniona podczas rozmowy telefonicznej.
Z poważaniem,
Obsługa Klienta Play`;
