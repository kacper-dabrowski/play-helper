import { addMonths, setDate } from 'date-fns';
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

        const startingDate = setDate(this.getCurrentDate(), this.dueDay);

        return shouldMoveMonthForward ? addMonths(startingDate, 1) : startingDate;
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
    private = false;

    generatePayments(amounts: number[]): { amount: number; date: string }[] {
        return this.handleDefaultCase(amounts);
    }

    protected calculateFirstPaymentDate(): Date {
        const dayOfMonth = this.getCurrentDate().getDate();

        const shouldMoveMonthForward = dayOfMonth >= this.dividingDay;

        const startingDate = setDate(this.getCurrentDate(), this.dueDay);

        const willMonthChange = this.willMonthChange(startingDate);

        if (shouldMoveMonthForward && willMonthChange) {
            return startingDate;
        }

        return shouldMoveMonthForward ? addMonths(startingDate, 1) : startingDate;
    }

    protected handleDefaultCase(amounts: number[]): { amount: number; date: string }[] {
        const startingDate = this.calculateFirstPaymentDate();

        return amounts.map((amount, index) => ({
            amount,
            date: convertDate(this.handleMonthChangedCase(startingDate, index).toString()),
        }));
    }

    private willMonthChange(startingDate: Date) {
        const simulateAddingMonth = addMonths(startingDate, 1);

        const isStillDueDay = startingDate.getDate() === this.dueDay;

        const didDayChange = startingDate.getDate() !== simulateAddingMonth.getDate();

        return !isStillDueDay || didDayChange;
    }

    private handleMonthChangedCase(startingDate: Date, monthsToAdd: number): Date {
        const willMonthChange = this.willMonthChange(startingDate);

        return willMonthChange ? setDate(startingDate, this.dueDay) : addMonths(startingDate, monthsToAdd);
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
