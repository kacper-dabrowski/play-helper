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
