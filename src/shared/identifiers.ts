export enum Project {
    Next = 'NEXT',
    Support = 'Support',
}

export enum Salutation {
    Man = 'MAN',
    Woman = 'WOMAN',
    Company = 'Company',
}

export enum ChannelType {
    Helpline = 'HELPLINE',
    Pos = 'POS',
    Chat = 'CHAT',
}

export enum CustomerType {
    Business = 'BUSINESS',
    Individual = 'INDIVIDUAL',
}

export enum DoubledNotificationType {
    Closed = 'CLOSED',
    Opened = 'OPENED',
}

export enum BillingPeriodCode {
    P01 = 'P01',
    P06 = 'P06',
    P10 = 'P10',
    P15 = 'P15',
    P20 = 'P20',
    P25 = 'P25',
}

export enum Language {
    Polish = 'POLISH',
    English = 'ENGLISH',
}

export enum NextTemplateType {
    Greeting = 'GREETING',
    DeleteAccount = 'DELETE_ACCOUNT',
    Notification = 'NOTIFICATION',
    Migration = 'MIGRATION',
    Roaming = 'ROAMING',
    QoS = 'QOS',
    NoResponse = 'NO_RESPONSE',
    EndConversation = 'END_CONVERSATION',
}

export enum NextNotes {
    Ask = 'ASK',
    JobEvaluation = 'JOB_EVALUATION',
}

export class BillingPeriod {
    dueDay: number;

    dividingDay: number;

    constructor({ dueDay, dividingDay }: { dueDay: number; dividingDay: number }) {
        this.dividingDay = dividingDay;
        this.dueDay = dueDay;
    }
}

export const config = {
    payments: {
        maxCount: 3,
        minCount: 2,
        deadlines: {
            P01: new BillingPeriod({ dueDay: 17, dividingDay: 8 }),
            P06: new BillingPeriod({
                dueDay: 22,
                dividingDay: 13,
            }),
            P10: new BillingPeriod({
                dueDay: 26,
                dividingDay: 17,
            }),
            P15: new BillingPeriod({
                dueDay: 31,
                dividingDay: 22,
            }),
            P20: new BillingPeriod({
                dueDay: 7,
                dividingDay: 28,
            }),
            P25: new BillingPeriod({
                dueDay: 10,
                dividingDay: 2,
            }),
        },
        maxAmount: 5000,
        maxInvoices: 3,
        invoiceRegex: /(F\/\d{8}\/(?:(?:0[0-9])|(?:1[012]))\/\d{2})/,
    },
};
