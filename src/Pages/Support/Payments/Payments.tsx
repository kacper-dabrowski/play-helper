import { Box, Button, CircularProgress, CircularProgressLabel, Text, VStack } from '@chakra-ui/react';
import React, { ChangeEventHandler, FC, useState } from 'react';
import AdditionalTemplate from '../../../components/Buttons/AdditionalTemplate/AdditionalTemplate';
import ConfirmButtons from '../../../components/Buttons/ConfirmButtons/ConfirmButtons';
import { MainTextarea } from '../../../components/Inputs/MainTextarea/MainTextarea';
import { Card } from '../../../components/UI/card/card';
import { toastProvider } from '../../../libs/toast';
import { generateAmountsArray, generatePaymentTemplates } from '../../../modules/payments/payments';
import config from '../../../shared/identifiers';
import Calculator from './Sections/Calculator';
import InvoicesContainer from './Sections/InvoicesContainer';
import PaymentSpan from './Sections/PaymentSpan';

interface PaymentsProps {
    fullName: string;
}

const Payments: FC<PaymentsProps> = ({ fullName }) => {
    const [paymentSpan, setPaymentSpan] = useState(null);
    const [amount, setAmount] = useState(0);
    const [paymentsCount, setPaymentsCount] = useState(config.payments.maxCount);
    const [invoices, setInvoices] = useState<string[]>([]);
    const [template, setTemplate] = useState('');
    const [additionalTemplateActive, setAdditionalTemplateActive] = useState(false);
    const [additionalTemplate, setAdditionalTemplate] = useState('');
    const [invoiceListOpened, setInvoiceListOpened] = useState(false);

    const setInvoicesHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
        try {
            const invoiceClickEvent = event;
            if (invoices.length === config.payments.maxInvoices) {
                return;
            }

            const invoiceString = event.target.value;
            const invoiceMatch = invoiceString.match(config.payments.invoiceRegex)?.[0];

            if (!invoiceMatch) {
                return;
            }

            if (invoices.includes(invoiceMatch)) {
                throw new Error('Ta faktura została już dodana!');
            }

            if (invoiceMatch) {
                setInvoices((currentInvoices) => [...currentInvoices, invoiceMatch]);
                invoiceClickEvent.target.value = '';
                toastProvider.success(`Faktura o numerze ${invoiceMatch} została dodana do listy`);
            }
        } catch (error) {
            if (error instanceof Error) {
                toastProvider.error(error.message);
            }
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
            if (error instanceof Error) {
                toastProvider.error(error.message);
            }
        }
    };

    const onClearFields = () => {
        setPaymentSpan(null);
        setAmount(0);
        setPaymentsCount(config.payments.maxCount);
        setInvoices([]);
        setTemplate('');
        setAdditionalTemplateActive(false);
    };

    return (
        <>
            <InvoicesContainer
                isOpened={invoiceListOpened}
                invoices={invoices}
                closeHandler={() => setInvoiceListOpened(false)}
                removeInvoiceHandler={onRemoveInvoice}
            />
            <Box display={'flex'} flexDir="row">
                <Card>
                    <Text>Kalkulator ratalny</Text>
                    <PaymentSpan setting={paymentSpan} setHandler={setPaymentSpan} />
                    <Calculator
                        paymentsCount={paymentsCount}
                        setPaymentsCountHandler={setPaymentsCount}
                        amount={amount}
                        setAmountHandler={setAmount}
                        onRemoveInvoice={onRemoveInvoice}
                        setInvoiceHandler={setInvoicesHandler}
                    />
                </Card>
                <Card>
                    <Box>
                        <CircularProgress value={(invoices.length / config.payments.maxInvoices) * 100}>
                            <CircularProgressLabel>{invoices.length}</CircularProgressLabel>
                        </CircularProgress>
                    </Box>
                    <Text>Ilość faktur</Text>
                    <VStack shouldWrapChildren>
                        <Button
                            colorScheme={'purple'}
                            disabled={!invoices.length}
                            onClick={() => setInvoiceListOpened(true)}
                        >
                            Zobacz listę faktur
                        </Button>
                        <AdditionalTemplate
                            title="Formatka ratalna"
                            enabled={additionalTemplateActive}
                            template={additionalTemplate}
                        />
                        <ConfirmButtons onGenerateTemplate={onDivideAmount} onClearFields={onClearFields} />
                    </VStack>
                </Card>
            </Box>
            <Box w="100%" py={10}>
                <MainTextarea value={template} setTemplate={setTemplate} />
            </Box>
        </>
    );
};

export default Payments;
