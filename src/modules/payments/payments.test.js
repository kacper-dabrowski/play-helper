import config from "../../shared/identifiers";
import { convertDate } from "../../shared/utils.js";
import { generatePaymentTemplates, generatePayments } from "./payments.js";
import moment from "moment";
beforeEach(() => {
  jest.restoreAllMocks();
});
it("should generate a valid payment string", () => {
  jest.spyOn(Date, "now").mockImplementation(() => 1605567600000);
  const paymentConfig = {
    name: "Kacper Dąbrowski",
    invoices: ["F/123", "F/1234", "F/12345"],
    payments: [41.5, 41.5, 41.5],
    paymentSpan: config.payments.spans.P01,
  };
  const { mainTemplate } = generatePaymentTemplates(paymentConfig);
  expect(mainTemplate)
    .toEqual(`Dziękuję za zgłoszenie. Rozłożyłem faktury o numerach: F/123, F/1234, F/12345 na 3 raty.
Rata pierwsza: 41.50 zł z datą płatności 17 grudnia 2020 roku,
rata druga: 41.50 zł z datą płatności 17 stycznia 2021 roku,
rata trzecia: 41.50 zł z datą płatności 17 lutego 2021 roku.
Proszę pamiętać o terminowej płatności rat oraz bieżących faktur, gdyż raty mogą zostać cofnięte.
Pozdrawiam
Obsługa Klienta Play.`);
});

describe("P01", () => {
  it("should generate a valid payments set for P01 after due date", () => {
    const paymentsConfig = {
      paymentSpan: config.payments.spans.P01,
      amounts: [41, 41, 41],
      currentDate: new Date("2020/11/17"),
      paymentsCount: 3,
    };
    expect(generatePayments(paymentsConfig)).toEqual([
      {
        date: convertDate(moment([2020, 11, 17]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 0, 17]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 1, 17]).toDate()),
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
        date: convertDate(moment([2020, 10, 17]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2020, 11, 17]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 0, 17]).toDate()),
        amount: 41,
      },
    ]);
  });
});

describe("P06", () => {
  it("should generate a valid payments set for P06 after due date", () => {
    const paymentsConfig = {
      paymentSpan: config.payments.spans.P06,
      amounts: [41, 41, 41],
      currentDate: new Date("2020/11/13"),
      paymentsCount: 3,
    };
    expect(generatePayments(paymentsConfig)).toEqual([
      {
        date: convertDate(moment([2020, 11, 22]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 0, 22]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 1, 22]).toDate()),
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
        date: convertDate(moment([2020, 10, 22]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2020, 11, 22]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 0, 22]).toDate()),
        amount: 41,
      },
    ]);
  });
});

describe("P10", () => {
  it("should generate a valid payments set for P10 after due date", () => {
    const paymentsConfig = {
      paymentSpan: config.payments.spans.P10,
      amounts: [41, 41, 41],
      currentDate: new Date("2020/11/17"),
      paymentsCount: 3,
    };
    expect(generatePayments(paymentsConfig)).toEqual([
      {
        date: convertDate(moment([2020, 11, 26]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 0, 26]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 1, 26]).toDate()),
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
        date: convertDate(moment([2020, 10, 26]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2020, 11, 26]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 0, 26]).toDate()),
        amount: 41,
      },
    ]);
  });
});

describe("P15", () => {
  it("should generate a valid payments set for P15 before due date", () => {
    const paymentsConfig = {
      paymentSpan: config.payments.spans.P15,
      amounts: [41, 41, 41],
      currentDate: new Date("2020/11/21"),
      paymentsCount: 3,
    };
    expect(generatePayments(paymentsConfig)).toEqual([
      {
        date: convertDate(moment([2020, 11, 1]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 0, 31]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 2, 3]).toDate()),
        amount: 41,
      },
    ]);
  });

  it("should generate a valid payments set for P15 before due date (30 days month in the middle)", () => {
    const paymentsConfig = {
      paymentSpan: config.payments.spans.P15,
      amounts: [41, 41, 41],
      currentDate: new Date("2020/10/21"),
      paymentsCount: 3,
    };
    expect(generatePayments(paymentsConfig)).toEqual([
      {
        date: convertDate(moment([2020, 9, 31]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2020, 11, 1]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2020, 11, 31]).toDate()),
        amount: 41,
      },
    ]);
  });

  it("should generate a valid payments set for P15 after due date", () => {
    const paymentsConfig = {
      paymentSpan: config.payments.spans.P15,
      amounts: [41, 41, 41],
      currentDate: new Date("2020/11/22"),
      paymentsCount: 3,
    };
    expect(generatePayments(paymentsConfig)).toEqual([
      {
        date: convertDate(moment([2020, 11, 31]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 0, 31]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 2, 3]).toDate()),
        amount: 41,
      },
    ]);
  });

  it("should generate a valid payments set for P15 after due date (hardest case)", () => {
    const paymentsConfig = {
      paymentSpan: config.payments.spans.P15,
      amounts: [41, 41, 41],
      currentDate: new Date("2021/01/22"),
      paymentsCount: 3,
    };
    expect(generatePayments(paymentsConfig)).toEqual([
      {
        date: convertDate(moment([2021, 2, 3]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 2, 31]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 4, 1]).toDate()),
        amount: 41,
      },
    ]);
  });
});
describe("P20", () => {
  it("should generate a valid payments set for P20 before due date", () => {
    const paymentsConfig = {
      paymentSpan: config.payments.spans.P20,
      amounts: [41, 41, 41],
      currentDate: new Date("2020/11/27"),
      paymentsCount: 3,
    };
    expect(generatePayments(paymentsConfig)).toEqual([
      {
        date: convertDate(moment([2020, 11, 7]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 0, 7]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 1, 7]).toDate()),
        amount: 41,
      },
    ]);
  });

  it("should generate a valid payments set for P20 after due date", () => {
    const paymentsConfig = {
      paymentSpan: config.payments.spans.P20,
      amounts: [41, 41, 41],
      currentDate: new Date("2020/11/28"),
      paymentsCount: 3,
    };
    expect(generatePayments(paymentsConfig)).toEqual([
      {
        date: convertDate(moment([2021, 0, 7]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 1, 7]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 2, 7]).toDate()),
        amount: 41,
      },
    ]);
  });
});

describe("P25", () => {
  it("should generate a valid payments set for P25 before due date", () => {
    const paymentsConfig = {
      paymentSpan: config.payments.spans.P25,
      amounts: [41, 41, 41],
      currentDate: new Date("2020/11/01"),
      paymentsCount: 3,
    };
    expect(generatePayments(paymentsConfig)).toEqual([
      {
        date: convertDate(moment([2020, 10, 10]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2020, 11, 10]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 0, 10]).toDate()),
        amount: 41,
      },
    ]);
  });

  it("should generate a valid payments set for P25 after due date", () => {
    const paymentsConfig = {
      paymentSpan: config.payments.spans.P25,
      amounts: [41, 41, 41],
      currentDate: new Date("2020/11/02"),
      paymentsCount: 3,
    };
    expect(generatePayments(paymentsConfig)).toEqual([
      {
        date: convertDate(moment([2020, 11, 10]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 0, 10]).toDate()),
        amount: 41,
      },
      {
        date: convertDate(moment([2021, 1, 10]).toDate()),
        amount: 41,
      },
    ]);
  });
});

it("should throw an error, if unknown payment span was passed to the function", () => {
  const paymentsConfig = {
    paymentSpan: "SOMETHING",
    amounts: [41, 41, 41],
    currentDate: new Date("2020/11/02"),
    paymentsCount: 3,
  };

  expect(() => generatePayments(paymentsConfig)).toThrow();
});
