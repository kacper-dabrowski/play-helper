import { getPaymentTitleReminder } from './paymentReminder';

describe('modules - payments - paymentReminder', () => {
    it('should return a payment title reminder with a period when 1 payment is pending', () => {
        expect(getPaymentTitleReminder(['1'])).toEqual('W tytule płatności rat proszę o wpisanie "Rata 1".');
    });

    it('should return a payment title reminder with a period when 2 payments is pending', () => {
        expect(getPaymentTitleReminder(['1', '2'])).toEqual(
            'W tytule płatności rat proszę o wpisanie "Rata 1", "Rata 2".'
        );
    });

    it('should return a payment title reminder with a period when 3 payments is pending', () => {
        expect(getPaymentTitleReminder(['1', '2', '3'])).toEqual(
            'W tytule płatności rat proszę o wpisanie "Rata 1", "Rata 2", "Rata 3".'
        );
    });
});
