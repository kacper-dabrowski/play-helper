import { addDays, addMonths, getDaysInMonth, isFirstDayOfMonth, isLastDayOfMonth, setDate, setMonth } from 'date-fns';
import config from '../../shared/identifiers';
import { convertDate } from '../../shared/utils';

export function createPaymentDivider(paymentSpan: keyof typeof config.payments.spans): PaymentDivider {
    const { dividingDay, dueDay } = getPaymentSpanConfig(paymentSpan);

    switch (paymentSpan) {
        case 'P01':
        case 'P06':
        case 'P10':
        case 'P25':
        case 'P20':
            return new DefaultDivider(dueDay, dividingDay);
        case 'P15':
            return new P15Divider(dueDay, dividingDay);
        default:
            throw new Error('Niepoprawny okres rozliczeniowy');
    }
}

abstract class PaymentDivider {
    constructor(protected dueDay: number, protected dividingDay: number) {}

    abstract generatePayments(amounts: number[]): { amount: number; date: string }[];

    protected calculateFirstPaymentDate(): Date {
        const dayOfMonth = this.getCurrentDate().getDate();

        const shouldMoveMonthForward = dayOfMonth >= this.dividingDay;

        const startingDate = setDate(this.getCurrentDate(), 15);

        const dateWithoutCorrectDate = shouldMoveMonthForward ? addMonths(startingDate, 1) : startingDate;

        return setDate(dateWithoutCorrectDate, this.dueDay);
    }

    protected handleDefaultCase(amounts: number[]) {
        const startingDate = this.calculateFirstPaymentDate();

        return amounts.map((amount, index) => ({
            amount,
            date: convertDate(addMonths(startingDate, index).toString()),
        }));
    }

    protected getCurrentDate = () => new Date();
}

class P15Divider extends PaymentDivider {
    private processedDates: Date[] = [];

    generatePayments(amounts: number[]): { amount: number; date: string }[] {
        return this.handleDefaultCase(amounts);
    }

    protected handleDefaultCase(amounts: number[]): { amount: number; date: string }[] {
        const startingDate = this.calculateFirstPaymentDate();

        return amounts.map((amount, index) => ({
            amount,
            date: convertDate(this.handleMovingMonths(startingDate, index).toString()),
        }));
    }

    private handleMovingMonths(startingDate: Date, monthsToAdd: number): Date {
        if (!monthsToAdd) {
            this.processedDates.push(startingDate);

            return startingDate;
        }

        const previouslyProcessedDate = this.processedDates[monthsToAdd - 1];

        const previousMonthBumpedDays = previouslyProcessedDate.getDate() !== 31;

        if (previousMonthBumpedDays) {
            const daysInCurrentMonth = getDaysInMonth(addMonths(setDate(previouslyProcessedDate, 15), 1));
            const paymentDate = addDays(previouslyProcessedDate, daysInCurrentMonth - 1);

            this.processedDates.push(paymentDate);

            return paymentDate;
        }

        const paymentDate = addMonths(previouslyProcessedDate, 1);

        this.processedDates.push(paymentDate);

        return paymentDate;
    }
}

class DefaultDivider extends PaymentDivider {
    generatePayments(amounts: number[]): { amount: number; date: string }[] {
        return this.handleDefaultCase(amounts);
    }
}

function getPaymentSpanConfig(paymentSpan: keyof typeof config.payments.spans): {
    dueDay: number;
    dividingDay: number;
} {
    return config.payments.deadlines[paymentSpan];
}
