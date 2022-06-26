import config from '../../shared/identifiers';
import { convertDate } from '../../shared/utils';
import { createPaymentDivider, generatePayments, generatePaymentTemplates } from './payments';

describe('payments', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.useFakeTimers();
    });
    it('should generate a valid payment string', () => {
        jest.spyOn(Date, 'now').mockImplementation(() => 1605567600000);
        const paymentConfig = {
            name: 'Kacper Dąbrowski',
            invoices: ['F/123', 'F/1234', 'F/12345'],
            payments: [41.5, 41.5, 41.5],
            paymentSpan: config.payments.spans.P01,
        };
        const { mainTemplate } = generatePaymentTemplates(paymentConfig);
        expect(mainTemplate)
            .toEqual(`Dziękuję za zgłoszenie. Rozłożyłem faktury o numerach: F/123, F/1234, F/12345 na 3 raty.
Rata pierwsza: 41,50zł z datą płatności 17 grudnia 2020 roku,
rata druga: 41,50zł z datą płatności 17 stycznia 2021 roku,
rata trzecia: 41,50zł z datą płatności 17 lutego 2021 roku.
Proszę pamiętać o terminowej płatności rat oraz bieżących faktur, gdyż raty mogą zostać cofnięte.
Pozdrawiam
Obsługa Klienta Play.`);
    });

    const expectedDays = {
        P01: {
            dateBefore: new Date('2020/11/07'),
            dateAfter: new Date('2020/11/08'),
            before: [
                createDateAssertion(2020, 10, 17),
                createDateAssertion(2020, 11, 17),
                createDateAssertion(2021, 0, 17),
            ],
            after: [
                createDateAssertion(2020, 11, 17),
                createDateAssertion(2021, 0, 17),
                createDateAssertion(2021, 1, 17),
            ],
        },
        P06: {
            dateBefore: new Date('2020/11/12'),
            dateAfter: new Date('2020/11/13'),
            before: [
                createDateAssertion(2020, 10, 22),
                createDateAssertion(2020, 11, 22),
                createDateAssertion(2021, 0, 22),
            ],
            after: [
                createDateAssertion(2020, 11, 22),
                createDateAssertion(2021, 0, 22),
                createDateAssertion(2021, 1, 22),
            ],
        },
        P10: {
            dateBefore: new Date('2020/11/16'),
            dateAfter: new Date('2020/11/17'),
            before: [
                createDateAssertion(2020, 10, 26),
                createDateAssertion(2020, 11, 26),
                createDateAssertion(2021, 0, 26),
            ],
            after: [
                createDateAssertion(2020, 11, 26),
                createDateAssertion(2021, 0, 26),
                createDateAssertion(2021, 1, 26),
            ],
        },
        P15: {
            dateBefore: new Date('2020/11/21'),
            dateAfter: new Date('2020/11/22'),
            before: [
                createDateAssertion(2020, 10, 17),
                createDateAssertion(2020, 11, 17),
                createDateAssertion(2021, 0, 17),
            ],
            after: [
                createDateAssertion(2020, 11, 17),
                createDateAssertion(2021, 0, 17),
                createDateAssertion(2021, 1, 17),
            ],
        },
        P20: {
            dateBefore: new Date('2020/11/27'),
            dateAfter: new Date('2020/11/28'),
            before: [
                createDateAssertion(2020, 10, 7),
                createDateAssertion(2020, 11, 7),
                createDateAssertion(2021, 0, 7),
            ],
            after: [createDateAssertion(2020, 11, 7), createDateAssertion(2021, 0, 7), createDateAssertion(2021, 1, 7)],
        },
        P25: {
            dateBefore: new Date('2020/11/01'),
            dateAfter: new Date('2020/11/02'),
            before: [
                createDateAssertion(2020, 10, 10),
                createDateAssertion(2020, 11, 10),
                createDateAssertion(2021, 0, 10),
            ],
            after: [
                createDateAssertion(2020, 11, 10),
                createDateAssertion(2021, 0, 10),
                createDateAssertion(2021, 1, 10),
            ],
        },
    };

    describe('modules - payments', () => {
        Object.values(config.payments.spans).forEach((paymentSpan) => {
            const divider = createPaymentDivider(paymentSpan);
            const amounts = [41, 41, 41];
            const { dateBefore, dateAfter } = expectedDays[paymentSpan] || {};

            it(`should generate a valid payments set for ${paymentSpan} before due date`, () => {
                jest.setSystemTime(dateBefore);

                const result = divider.generatePayments(amounts);

                expectedDays[paymentSpan].before.forEach((expectedDate, index) => {
                    expect(result[index]).toMatchObject({ date: expectedDate });
                });
            });

            it(`should generate a valid payments set for ${paymentSpan} after due date`, () => {
                jest.setSystemTime(dateAfter);

                const result = divider.generatePayments(amounts);

                expectedDays[paymentSpan].after.forEach((expectedDate, index) => {
                    expect(result[index]).toMatchObject({ date: expectedDate });
                });
            });
        });

        it('should pass', () => {
            const divider = createPaymentDivider('P15');
            jest.setSystemTime(new Date('2022/06/18'));

            const expected = [
                convertDate(new Date(2022, 6, 1)),
                convertDate(new Date(2022, 6, 31)),
                convertDate(new Date(2022, 7, 31)),
            ];

            divider.generatePayments([41, 41, 41]).forEach(({ date }, index) => {
                expect(date).toEqual(expected[index]);
            });
        });
    });

    describe('P15', () => {
        it('should generate a valid payments set for P15 before due date', () => {
            const paymentsConfig = {
                paymentSpan: config.payments.spans.P15,
                amounts: [41, 41, 41],
                currentDate: new Date('2020/11/21'),
                paymentsCount: 3,
            };
            expect(generatePayments(paymentsConfig)).toEqual([
                {
                    date: convertDate(new Date(2020, 11, 1)),
                    amount: 41,
                },
                {
                    date: convertDate(new Date(2021, 0, 31)),
                    amount: 41,
                },
                {
                    date: convertDate(new Date(2021, 2, 3)),
                    amount: 41,
                },
            ]);
        });

        it('should generate a valid payments set for P15 before due date (30 days month in the middle)', () => {
            const paymentsConfig = {
                paymentSpan: config.payments.spans.P15,
                amounts: [41, 41, 41],
                currentDate: new Date('2020/10/21'),
                paymentsCount: 3,
            };
            expect(generatePayments(paymentsConfig)).toEqual([
                {
                    date: convertDate(new Date(2020, 9, 31)),
                    amount: 41,
                },
                {
                    date: convertDate(new Date(2020, 11, 1)),
                    amount: 41,
                },
                {
                    date: convertDate(new Date(2020, 11, 31)),
                    amount: 41,
                },
            ]);
        });

        it('should generate a valid payments set for P15 after due date', () => {
            const paymentsConfig = {
                paymentSpan: config.payments.spans.P15,
                amounts: [41, 41, 41],
                currentDate: new Date('2020/11/22'),
                paymentsCount: 3,
            };
            expect(generatePayments(paymentsConfig)).toEqual([
                {
                    date: convertDate(new Date(2020, 11, 31)),
                    amount: 41,
                },
                {
                    date: convertDate(new Date(2021, 0, 31)),
                    amount: 41,
                },
                {
                    date: convertDate(new Date(2021, 2, 3)),
                    amount: 41,
                },
            ]);
        });

        it('should generate a valid payments set for P15 after due date (hardest case)', () => {
            const paymentsConfig = {
                paymentSpan: config.payments.spans.P15,
                amounts: [41, 41, 41],
                currentDate: new Date('2021/01/22'),
                paymentsCount: 3,
            };
            expect(generatePayments(paymentsConfig)).toEqual([
                {
                    date: convertDate(new Date(2021, 2, 3)),
                    amount: 41,
                },
                {
                    date: convertDate(new Date(2021, 4, 1)),
                    amount: 41,
                },
                {
                    date: convertDate(new Date(2021, 4, 31)),
                    amount: 41,
                },
            ]);
        });
    });
    describe('P20', () => {
        it('should generate a valid payments set for P20 before due date', () => {
            const paymentsConfig = {
                paymentSpan: config.payments.spans.P20,
                amounts: [41, 41, 41],
                currentDate: new Date('2020/11/27'),
                paymentsCount: 3,
            };
            expect(generatePayments(paymentsConfig)).toEqual([
                {
                    date: convertDate(new Date(2020, 11, 7)),
                    amount: 41,
                },
                {
                    date: convertDate(new Date(2021, 0, 7)),
                    amount: 41,
                },
                {
                    date: convertDate(new Date(2021, 1, 7)),
                    amount: 41,
                },
            ]);
        });

        it('should generate a valid payments set for P20 after due date', () => {
            const paymentsConfig = {
                paymentSpan: config.payments.spans.P20,
                amounts: [41, 41, 41],
                currentDate: new Date('2020/11/28'),
                paymentsCount: 3,
            };
            expect(generatePayments(paymentsConfig)).toEqual([
                {
                    date: convertDate(new Date(2021, 0, 7)),
                    amount: 41,
                },
                {
                    date: convertDate(new Date(2021, 1, 7)),
                    amount: 41,
                },
                {
                    date: convertDate(new Date(2021, 2, 7)),
                    amount: 41,
                },
            ]);
        });
    });

    it('should throw an error, if unknown payment span was passed to the function', () => {
        const paymentsConfig = {
            paymentSpan: 'SOMETHING',
            amounts: [41, 41, 41],
            currentDate: new Date('2020/11/02'),
            paymentsCount: 3,
        };

        expect(() => generatePayments(paymentsConfig)).toThrow();
    });
});

function createDateAssertion(year, month, day) {
    return convertDate(new Date(year, month, day));
}
