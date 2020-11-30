import config from "../../shared/settings";
import moment from "moment";

export const generatePaymentsTemplate = (paymentConfig) => {
  const { invoices, payments, name } = paymentConfig;

  return `${generateInvoiceString(name, invoices)} na ${payments.length} raty.
${generatePaymentsList(payments)}
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
