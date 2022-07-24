import Big from 'big.js';
import dateAdd from 'date-fns/add';
import dateSet from 'date-fns/set';
import config from '../../shared/identifiers';
import { convertDate, getJoiningSign } from '../../shared/utils';
import numberToCurrency from './numberToCurrency';
import { getPaymentTitleReminder } from './paymentReminder';

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
        throw new Error('Nie wybrano poprawnego okresu rozliczeniowego!');
    }
};

export const generateAmountsArray = (amount, paymentsCount) => {
    const amountDivided = new Big(amount).div(paymentsCount).toFixed(2);

    const amountsArray = [];

    for (let i = 0; i < paymentsCount; i += 1) {
        amountsArray.push(Number(amountDivided));
    }
    const isRoundCorrect = Number(amountDivided) * 3 === amount;

    if (!isRoundCorrect) {
        const difference = Number(amount - Number(amountDivided) * paymentsCount);
        amountsArray[0] += difference;
    }
    return amountsArray;
};

export const generateAdditionalTemplate = (templateConfig) => {
    const { paymentSpan, paymentsCount, paymentsObject, invoices } = templateConfig;
    return `Okres rozliczeniowy: ${paymentSpan}
Liczba przyznanych rat: ${paymentsCount}
Kwotę każdej przyznanej raty:
${paymentsObject
    .map(
        (payment, index) =>
            `Rata ${index + 1} - ${numberToCurrency(payment.amount)}${getJoiningSign({ index, paymentsObject })}`
    )
    .join('')}
Termin płatności danej raty:
${paymentsObject
    .map(
        (payment, index) =>
            `Rata ${index + 1} - ${payment.date}${getJoiningSign({
                index,
                array: paymentsObject,
                lastSign: '',
                sign: ',',
            })}`
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

export const generatePaymentTemplates = (paymentConfig) => {
    const { invoices, payments, name, paymentSpan } = paymentConfig;

    const paymentsConfig = {
        currentDate: new Date(),
        amounts: payments,
        paymentsCount: payments.length,
        paymentSpan,
    };

    const additionalTemplateConfig = {
        paymentSpan,
        paymentsCount: payments.length,
        paymentsObject: generatePayments(paymentsConfig),
        invoices,
    };

    const paymentsObject = generatePayments(paymentsConfig);

    const paymentsList = generatePaymentsList(paymentsObject);

    return {
        mainTemplate: `${generateInvoiceString(name, invoices)} na ${payments.length} raty.
${paymentsList}
Proszę pamiętać o terminowej płatności rat oraz bieżących faktur, gdyż raty mogą zostać cofnięte. ${getPaymentTitleReminder(
            payments
        )} ${addJobEvaluationRequest({ name })}
Pozdrawiam
Obsługa Klienta Play.`,
        additionalTemplate: generateAdditionalTemplate(additionalTemplateConfig),
    };
};

function addJobEvaluationRequest({ name }) {
    if (typeof name !== 'string') {
        return '';
    }

    const genderBasedEnding = name.endsWith('a') ? 'a' : 'y';
    return `Będę wdzięczn${genderBasedEnding} za ocenę mojej pracy bezpłatnym, zwrotnym smsem.`;
}

function generateInvoiceString(name, invoices) {
    const genderEnding = name.endsWith('a') ? 'Rozłożyłam' : 'Rozłożyłem';

    const invoiceEnding = invoices.length > 1 ? 'faktury o numerach:' : 'fakturę o numerze';
    const invoicesList = invoices.map((invoice, index) => {
        return `${invoice}${getJoiningSign({ index, array: invoices, lastSign: '', sign: ',' })}`;
    });

    return `Dziękuję za zgłoszenie. ${genderEnding} ${invoiceEnding} ${invoicesList.join(' ')}`;
}

function generatePaymentsObject(generatorConfig, dividingDay, dueDay) {
    const { currentDate, paymentsCount, amounts } = generatorConfig;
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();

    let startingMonth = currentDay >= dividingDay ? currentMonth + 1 : currentMonth;
    if (dueDay === 7) {
        startingMonth += 1;
    }
    const startingDate = dateSet(currentDate, { month: startingMonth, date: dueDay });

    const payments = [];

    for (let i = 0; i < paymentsCount; i += 1) {
        let date = dateAdd(startingDate, { months: i });

        if (dueDay === 31 && i !== 0) {
            date = dateSet(date, { date: dueDay });
        }

        payments.push({
            amount: amounts[i],
            date: convertDate(date),
        });
    }

    return payments;
}

function generatePaymentsList(payments) {
    const paymentStrings = payments.map((payment, index) => {
        switch (index + 1) {
            case 1:
                return `Rata pierwsza: ${numberToCurrency(payment.amount)} z datą płatności ${payment.date},`;
            case 2:
                return `rata druga: ${numberToCurrency(payment.amount)} z datą płatności ${
                    payment.date
                }${getJoiningSign({ index, array: payments })}`;
            case 3:
                return `rata trzecia: ${numberToCurrency(payment.amount)} z datą płatności ${payment.date}.`;
            default:
                throw new Error('Nieobsługiwana liczba rat');
        }
    });

    return paymentStrings.join(`
`);
}
