import config from "../../shared/settings.js";
import { generatePaymentsTemplate, generatePayments } from "./payments.js";

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

it("should generate a valid payments set for P01 after due date", () => {
  const paymentsConfig = {
    paymentSpan: config.payments.spans.P01,
    amounts: [41, 41, 41],
    currentDate: new Date("2020/11/17"),
    paymentsCount: 3,
  };
  expect(generatePayments(paymentsConfig)).toEqual([
    {
      date: new Date("2020/12/17"),
      amount: 41,
    },
    {
      date: new Date("2021/01/17"),
      amount: 41,
    },
    {
      date: new Date("2021/02/17"),
      amount: 41,
    },
  ]);
});

it("should generate a valid payments set for P01 before due date", () => {
  const paymentsConfig = {
    paymentSpan: config.payments.spans.P01,
    amounts: [41, 41, 41],
    currentDate: new Date("2020/11/07"),
    paymentsCount: 3,
  };
  expect(generatePayments(paymentsConfig)).toEqual([
    {
      date: new Date("2020/11/17"),
      amount: 41,
    },
    {
      date: new Date("2020/12/17"),
      amount: 41,
    },
    {
      date: new Date("2021/01/17"),
      amount: 41,
    },
  ]);
});

it("should generate a valid payments set for P06 after due date", () => {
  const paymentsConfig = {
    paymentSpan: config.payments.spans.P06,
    amounts: [41, 41, 41],
    currentDate: new Date("2020/11/13"),
    paymentsCount: 3,
  };
  expect(generatePayments(paymentsConfig)).toEqual([
    {
      date: new Date("2020/12/22"),
      amount: 41,
    },
    {
      date: new Date("2021/01/22"),
      amount: 41,
    },
    {
      date: new Date("2021/02/22"),
      amount: 41,
    },
  ]);
});

it("should generate a valid payments set for P06 before due date", () => {
  const paymentsConfig = {
    paymentSpan: config.payments.spans.P06,
    amounts: [41, 41, 41],
    currentDate: new Date("2020/11/11"),
    paymentsCount: 3,
  };
  expect(generatePayments(paymentsConfig)).toEqual([
    {
      date: new Date("2020/11/22"),
      amount: 41,
    },
    {
      date: new Date("2020/12/22"),
      amount: 41,
    },
    {
      date: new Date("2021/01/22"),
      amount: 41,
    },
  ]);
});

it("should generate a valid payments set for P10 after due date", () => {
  const paymentsConfig = {
    paymentSpan: config.payments.spans.P10,
    amounts: [41, 41, 41],
    currentDate: new Date("2020/11/17"),
    paymentsCount: 3,
  };
  expect(generatePayments(paymentsConfig)).toEqual([
    {
      date: new Date("2020/12/26"),
      amount: 41,
    },
    {
      date: new Date("2021/01/26"),
      amount: 41,
    },
    {
      date: new Date("2021/02/26"),
      amount: 41,
    },
  ]);
});

it("should generate a valid payments set for P10 before due date", () => {
  const paymentsConfig = {
    paymentSpan: config.payments.spans.P10,
    amounts: [41, 41, 41],
    currentDate: new Date("2020/11/15"),
    paymentsCount: 3,
  };
  expect(generatePayments(paymentsConfig)).toEqual([
    {
      date: new Date("2020/11/26"),
      amount: 41,
    },
    {
      date: new Date("2020/12/26"),
      amount: 41,
    },
    {
      date: new Date("2021/01/26"),
      amount: 41,
    },
  ]);
});
