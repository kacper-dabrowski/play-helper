import { createPaymentDivider } from './payments';

export const generateAdditionalTemplate = (templateConfig) => {
    const { paymentSpan, paymentsCount, paymentsObject, invoices } = templateConfig;
    return `Okres rozliczeniowy: ${paymentSpan}
Liczba przyznanych rat: ${paymentsCount}
Kwotę każdej przyznanej raty:
${paymentsObject
    .map(
        (payment, index) =>
            `Rata ${index + 1} - ${numberToCurrency(payment.amount)}${
                index + 1 < paymentsObject.length
                    ? `,
`
                    : '.'
            }`
    )
    .join('')}
Termin płatności danej raty:
${paymentsObject
    .map(
        (payment, index) =>
            `Rata ${index + 1} - ${payment.date}${
                index + 1 < paymentsObject.length
                    ? `,
`
                    : ''
            }`
    )
    .join('')}
Numery faktur rozłożonych na raty:
${invoices
    .map(
        (invoice, index) =>
            `${invoice}${
                index + 1 < invoices.length
                    ? `,
`
                    : ''
            }`
    )
    .join('')}
`;
};

export const generatePaymentTemplates = (paymentConfig): { mainTemplate: string; additionalTemplate: string } => {
    const { invoices, payments, name, paymentSpan } = paymentConfig;

    const paymentDivider = createPaymentDivider(paymentSpan);
    const paymentsObject = paymentDivider.generatePayments(payments);

    const additionalTemplateConfig = {
        paymentSpan,
        paymentsCount: payments.length,
        paymentsObject,
        invoices,
    };

    const paymentsList = generatePaymentsList(paymentsObject);

    return {
        mainTemplate: `${generateInvoiceString(name, invoices)} na ${payments.length} raty.
${paymentsList}
Proszę pamiętać o terminowej płatności rat oraz bieżących faktur, gdyż raty mogą zostać cofnięte.
Pozdrawiam
Obsługa Klienta Play.`,
        additionalTemplate: generateAdditionalTemplate(additionalTemplateConfig),
    };
};

function generateInvoiceString(name, invoices) {
    const genderEnding = name.endsWith('a') ? 'Rozłożyłam' : 'Rozłożyłem';

    const invoiceEnding = invoices.length > 1 ? 'faktury o numerach:' : 'fakturę o numerze';
    const invoicesList = invoices.map((invoice, index) => {
        return `${invoice}${index + 1 === invoices.length ? '' : `,`}`;
    });

    return `Dziękuję za zgłoszenie. ${genderEnding} ${invoiceEnding} ${invoicesList.join(' ')}`;
}

function generatePaymentsList(payments) {
    const paymentStrings = payments.map((payment, index) => {
        switch (index + 1) {
            case 1:
                return `Rata pierwsza: ${numberToCurrency(payment.amount)} z datą płatności ${payment.date},`;
            case 2:
                return `rata druga: ${numberToCurrency(payment.amount)} z datą płatności ${payment.date}${
                    index - 1 === payments.length ? '.' : ','
                }`;
            case 3:
                return `rata trzecia: ${numberToCurrency(payment.amount)} z datą płatności ${payment.date}.`;
            default:
                throw new Error('Nieobsługiwana liczba rat');
        }
    });

    return paymentStrings.join(`
`);
}

function numberToCurrency(amount: any) {
    if (typeof amount !== 'number') {
        throw new Error('Niepoprawna kwota');
    }

    return `${amount.toFixed(2)}zł`;
}
