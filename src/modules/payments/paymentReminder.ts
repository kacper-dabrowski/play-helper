import { getJoiningSign } from '../../shared/utils';

export function getPaymentTitleReminder(payments: Array<unknown> = []) {
    if (!payments?.length) {
        return '';
    }

    const prefix = `W tytule płatności rat proszę o wpisanie`;

    const paymentsReminder = payments
        .map((payment, index, paymentsArray) => `"Rata ${index + 1}"${getJoiningSign({ index, array: paymentsArray })}`)
        .join(' ');

    return `${prefix} ${paymentsReminder}`;
}
