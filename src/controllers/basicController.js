import config from "../shared/settings";
import { convertDate } from "../shared/utils";

const generateBasicTemplate = (sex, type, channel, date, general, details) => {
  let template;
  let convertedType;
  let convertedChannel;

  const convertedDate = convertDate(date);

  const name = "Dupa";
  console.log(type, config.type.business);
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
      
      Z poważaniem,
      ${name}
      Obsługa Klienta Play
      `;
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
      
      Z poważaniem,
      ${name}
      Obsługa Klienta Play
      `;
  }
  console.log(template);
  return template;
};

export default generateBasicTemplate;
