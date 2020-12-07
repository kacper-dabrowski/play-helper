import config from "../../shared/settings";
import moment from "moment";
import Big from "big.js";

export const generateAdditionalTemplate = (templateConfig) => {
  const { paymentSpan, paymentsCount, amounts } = templateConfig;
  return `Okres rozliczeniowy: ${paymentSpan}
Liczba przyznanych rat: ${paymentsCount}
Kwotę każdej przyznanej raty:
${amounts.map(
  (amount, index) =>
    `Rata ${index + 1} - ${amount}${index !== amounts.length ? "," : ""}`
)}
Termin płatności danej raty:
Rata 1 - 26 grudnia 2020 roku,
Rata 2 - 26 stycznia 2021 roku,
Rata 3 - 26 lutego 2021 roku
Numery faktur rozłożonych na raty:
F/12312312/19
`;
};

export const generatePaymentsTemplate = (paymentConfig) => {
  const { invoices, payments, name, paymentSpan } = paymentConfig;
  const paymentsConfig = {
    currentDate: new Date(),
    amounts: payments,
    paymentsCount: payments.length,
    paymentSpan: paymentSpan,
  };

  const paymentsObject = generatePayments(paymentsConfig);
  const paymentsList = generatePaymentsList(paymentsObject);

  return `${generateInvoiceString(name, invoices)} na ${payments.length} raty.
${paymentsList}
Proszę pamiętać o terminowej płatności rat oraz bieżących faktur, gdyż raty mogą zostać cofnięte.
Pozdrawiam
Obsługa Klienta Play.`;
};

const generateInvoiceString = (name, invoices) => {
  const genderEnding = name.endsWith("a") ? "Rozłożyłam" : "Rozłożyłem";

  const invoiceEnding =
    invoices.length > 1 ? "faktury o numerach:" : "fakturę o numerze";
  const invoicesList = invoices.map((invoice, index) => {
    return `${invoice}${index === invoices.length - 1 ? "" : ","}`;
  });

  return `Dziękuję za zgłoszenie. ${genderEnding} ${invoiceEnding} ${invoicesList.join(
    " "
  )}`;
};

const generatePaymentsList = (payments) => {
  const paymentStrings = payments.map((payment, index) => {
    switch (index + 1) {
      case 1:
        return `Rata pierwsza: ${payment.amount} zł z datą płatności ${payment.date},`;
      case 2:
        return `rata druga: ${payment.amount} zł z datą płatności ${
          payment.date
        }${index - 1 === payments.length ? "." : ","}`;
      case 3:
        return `rata trzecia: ${payment.amount} zł z datą płatności ${payment.date}.`;
      default:
        throw new Error("Nieobsługiwana liczba rat");
    }
  });
  return paymentStrings.join(`
`);
};

export const generatePayments = (paymentsConfig) => {
  const { currentDate, amounts, paymentsCount, paymentSpan } = paymentsConfig;
  const generatorConfig = {
    currentDate,
    amounts,
    paymentsCount,
  };
  try {
    const { dueDay, dividingDay } = config.payments.deadlines[paymentSpan];
    return generatePaymentsObject(generatorConfig, dividingDay, dueDay);
  } catch (error) {
    throw new Error(
      "Unknown payment span was passed to the function, details: " +
        error.message
    );
  }
};

const generatePaymentsObject = (generatorConfig, dividingDay, dueDay) => {
  const { currentDate, paymentsCount, amounts } = generatorConfig;
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();

  let startingMonth =
    currentDay >= dividingDay ? currentMonth + 1 : currentMonth;
  if (dueDay === 7) {
    startingMonth += 1;
  }
  const startingDate = moment(currentDate)
    .set("month", startingMonth)
    .set("date", dueDay);

  const payments = [];

  for (let i = 0; i < paymentsCount; i++) {
    const date = moment(startingDate).add(i, "months");
    if (dueDay === 31 && i !== 0) {
      date.set("date", dueDay);
    }

    payments.push({
      amount: amounts[i],
      date: date.format("DD/MM/YYYY"),
    });
  }

  return payments;
};

export const generateAmountsArray = (amount, paymentsCount) => {
  const amountDivided = new Big(amount).div(paymentsCount).toFixed(2);

  let amountsArray = [];

  for (let i = 0; i < paymentsCount; i++) {
    amountsArray.push(Number(amountDivided));
  }
  const isRoundCorrect = Number(amountDivided) * 3 === amount;

  if (!isRoundCorrect) {
    const difference = Number(amount - Number(amountDivided) * paymentsCount);
    amountsArray[0] += difference;
  }
  return amountsArray;
};
