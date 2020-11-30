import config from "../../shared/settings";

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

  switch (paymentSpan) {
    case config.payments.spans.P01:
      return generatePaymentsObject(currentDate, paymentsCount, amounts, 8, 17);
    case config.payments.spans.P06:
      return generatePaymentsObject(
        currentDate,
        paymentsCount,
        amounts,
        13,
        22
      );
    case config.payments.spans.P10:
      return generatePaymentsObject(
        currentDate,
        paymentsCount,
        amounts,
        17,
        26
      );
    case config.payments.spans.P15:
    case config.payments.spans.P20:
    case config.payments.spans.P25:
    default:
      throw new Error("Nieznany okres rozliczenowy!");
  }
};

const generatePaymentsObject = (
  currentDate,
  paymentsCount,
  amounts,
  dividingDay,
  dueDay
) => {
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  let startingMonth =
    currentDay >= dividingDay ? currentMonth + 2 : currentMonth + 1;

  const payments = [];
  for (let i = 0; i < paymentsCount; i++) {
    payments.push({
      amount: amounts[i],
      date: new Date(
        `${startingMonth > 12 ? currentYear + 1 : currentYear}/${
          startingMonth > 12 ? startingMonth - 12 : startingMonth
        }/${dueDay}`
      ),
    });
    startingMonth++;
  }

  return payments;
};
