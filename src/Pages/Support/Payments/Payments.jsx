import React, { useState } from 'react';
import AdditionalTemplate from '../../../components/Buttons/AdditionalTemplate/AdditionalTemplate';
import ConfirmButtons from '../../../components/Buttons/ConfirmButtons/ConfirmButtons';
import MainTextarea from '../../../components/Inputs/MainTextarea/MainTextarea';
import { toastProvider } from '../../../libs/toast';
import { generateAmountsArray, generatePaymentTemplates } from '../../../modules/payments/payments';
import config from '../../../shared/identifiers';
import Calculator from './Sections/Calculator';
import InvoicesContainer from './Sections/InvoicesContainer';
import PaymentSpan from './Sections/PaymentSpan';
import { PaymentsContainer } from './StyledPayments';

const Payments = ({ fullName }) => {
    const [paymentSpan, setPaymentSpan] = useState(null);
    const [amount, setAmount] = useState(0);
    const [paymentsCount, setPaymentsCount] = useState(config.payments.maxCount);
    const [invoices, setInvoices] = useState([]);
    const [template, setTemplate] = useState('');
    const [additionalTemplateActive, setAdditionalTemplateActive] = useState(false);
    const [additionalTemplate, setAdditionalTemplate] = useState('');
    const [invoiceListOpened, setInvoiceListOpened] = useState(false);

    const setInvoicesHandler = (event) => {
        try {
            const invoiceClickEvent = event;
            if (invoices.length === config.payments.maxInvoices) {
                throw new Error(`Fakturę rozkładamy na maksymalnie ${config.payments.maxInvoices} raty`);
            }
            const invoiceString = event.target.value;
            const invoiceMatch = invoiceString.match(config.payments.invoiceRegex)?.[0];

            if (invoices.includes(invoiceMatch)) {
                throw new Error('Ta faktura została już dodana!');
            }

            if (invoiceMatch) {
                setInvoices((currentInvoices) => [...currentInvoices, invoiceMatch]);
                invoiceClickEvent.target.value = '';
                toastProvider.success(`Faktura o numerze ${invoiceMatch} została dodana do listy`);
            }
        } catch (error) {
            toastProvider.error(error.message);
        }
    };

    const onRemoveInvoice = (invoiceNumber) => {
        setInvoices((currentInvoices) => currentInvoices.filter((invoice) => invoice !== invoiceNumber));
        return toastProvider.success(`Faktura o numerze ${invoiceNumber} została pomyślnie usunięta z listy`);
    };

    const onDivideAmount = () => {
        try {
            const parsedAmount = Number(amount);

            if (Number.isNaN(parsedAmount) || parsedAmount === 0 || parsedAmount > config.payments.maxAmount) {
                throw new Error('Została podana nieprawidłowa kwota do podziału na raty');
            }
            if (invoices.length <= 0 || invoices.length > 3) {
                throw new Error('Niepoprawna liczba faktur');
            }

            const amountsArray = generateAmountsArray(parsedAmount, paymentsCount);
            const paymentTemplates = generatePaymentTemplates({
                name: fullName,
                payments: amountsArray,
                invoices,
                paymentSpan,
            });
            setTemplate(paymentTemplates.mainTemplate);
            setAdditionalTemplateActive(true);
            setAdditionalTemplate(paymentTemplates.additionalTemplate);
        } catch (error) {
            toastProvider.error(error.message);
        }
    };

    const onClearFields = () => {
        setPaymentSpan(null);
        setAmount(null);
        setPaymentsCount(config.payments.maxCount);
        setInvoices([]);
        setTemplate('');
        setAdditionalTemplateActive(false);
    };
    return (
        <>
            <PaymentsContainer>
                <PaymentSpan setting={paymentSpan} setHandler={setPaymentSpan} />
                <Calculator
                    paymentsCount={paymentsCount}
                    openOverlayHandler={() => setInvoiceListOpened(true)}
                    setPaymentsCountHandler={setPaymentsCount}
                    amount={amount}
                    setAmountHandler={setAmount}
                    invoices={invoices}
                    setInvoiceHandler={setInvoicesHandler}
                    onRemoveInvoice={onRemoveInvoice}
                />
                <InvoicesContainer
                    isOpened={invoiceListOpened}
                    invoices={invoices}
                    closeHandler={() => setInvoiceListOpened(false)}
                    removeInvoiceHandler={onRemoveInvoice}
                />
                <AdditionalTemplate
                    title="Formatka ratalna"
                    enabled={additionalTemplateActive}
                    template={additionalTemplate}
                />
                <ConfirmButtons onGenerateTemplate={onDivideAmount} onClearFields={onClearFields} />
            </PaymentsContainer>
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};

export default Payments;
