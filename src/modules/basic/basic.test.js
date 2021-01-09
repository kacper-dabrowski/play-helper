const { generateBasicTemplate } = require("./basic");
const config = require("../../shared/identifiers");

it("should generate a valid basic template for man, business type and helpline channel with and without offer", () => {
  const templateConfig = {
    name: "Test Test",
    sex: config.default.sex.man,
    type: config.default.type.business,
    channel: config.default.channel.helpline,
    date: "11-12-2020",
    general: "asd",
    details: "asd",
    hasOffer: false,
  };
  expect(generateBasicTemplate(templateConfig)).toEqual(`Szanowny Panie,

dziękuję za zgłoszenie, które dotyczyło asd.

Otrzymałem je 12 listopada 2020 roku za pośrednictwem Infolinii Play.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że asd.

Pomocne informacje:
Jeśli ma Pan pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Pana dyspozycji pod numerem 790 600 600.
Będę wdzięczny, jeżeli oceni Pan moją pracę, proszę pamiętać, że ocenia Pan mój wkład w rozwiązanie zgłaszanej kwestii.

Z poważaniem,
Test Test
Obsługa Klienta Play`);
  expect(generateBasicTemplate({ ...templateConfig, hasOffer: true }))
    .toEqual(`Szanowny Panie,

dziękuję za zgłoszenie, które dotyczyło asd.

Otrzymałem je 12 listopada 2020 roku za pośrednictwem Infolinii Play.

Dokładnie zapoznałem się z treścią zgłoszenia i rozwiązanie zamieszczam poniżej.

Weryfikacja i szczegóły sprawy:
Uprzejmie informuję, że asd.

Pomocne informacje:
Jeśli ma Pan pytania, zachęcam do korzystania z aplikacji mobilnej Play24.
Jesteśmy także do Pana dyspozycji pod numerem 790 600 600.
Będę wdzięczny, jeżeli oceni Pan moją pracę, proszę pamiętać, że ocenia Pan mój wkład w rozwiązanie zgłaszanej kwestii.

Zachęcamy do zapoznania się z nowymi ofertami dla stałych Klientów. W przypadku zainteresowania prosimy o wysłanie SMS o treści TELEFON pod numer 8016 - oddzwonimy i dobierzemy ofertę.
Z poważaniem,
Test Test
Obsługa Klienta Play`);
});
