import { generatePaymentsTemplate } from "./paymentsController.js";

it("should generate a valid payment string", () => {
  const paymentConfig = {
    name: "Kacper Dąbrowski",
    invoices: ["F/123", "F/1234", "F/12345"],
    payments: [
      { amount: "41.00", date: "31 grudnia 2020 roku" },
      { amount: "41.00", date: "31 stycznia 2021 roku" },
      { amount: "41.00", date: "3 marca 2021 roku" },
    ],
  };
  expect(generatePaymentsTemplate(paymentConfig))
    .toEqual(`Dziękuję za zgłoszenie. Rozłożyłem faktury o numerach: F/123, F/1234, F/12345 na 3 raty.
Rata pierwsza: 41.00 zł z datą płatności 31 grudnia 2020 roku,
rata druga: 41.00 zł z datą płatności 31 stycznia 2021 roku,
rata trzecia: 41.00 zł z datą płatności 3 marca 2021 roku.
Proszę pamiętać o terminowej płatności rat oraz bieżących faktur, gdyż raty mogą zostać cofnięte.
Pozdrawiam
Obsługa Klienta Play.`);
});
