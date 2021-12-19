import React from 'react';
import SubmitButton from '../../../../components/Buttons/SubmitButton/SubmitButton';
import Counter from '../../../../components/Counter/Counter';
import SupportInput from '../../../../components/Inputs/SupportInput/SupportInput';
import { config } from '../../../../shared/identifiers';
import { CalculatorWrapper } from '../StyledPayments';

const Calculator = ({
    setPaymentsCountHandler,
    amount,
    setInvoiceHandler,
    invoices,
    setAmountHandler,
    openOverlayHandler,
    paymentsCount,
}) => {
    const counterClickedHandler = (currentValue, minValue, maxValue) => {
        if (currentValue === maxValue) return setPaymentsCountHandler(minValue);
        if (currentValue >= minValue) return setPaymentsCountHandler((cur) => cur + 1);
        throw new Error('Błąd podczas przekazywania wartości licznika');
    };

    return (
        <CalculatorWrapper>
            <div>
                <SupportInput
                    labelContent="Kwota do rozłozenia"
                    name="amount"
                    type="number"
                    onChange={(event) => setAmountHandler(Number(event.target.value))}
                    value={amount || ''}
                />
            </div>
            <div>
                <SupportInput labelContent="Numery faktur" onChange={(event) => setInvoiceHandler(event)} />
                <p>Liczba faktur: {invoices.length}</p>
                <SubmitButton disabled={!invoices.length} onClick={openOverlayHandler} title="Zobacz listę faktur" />
            </div>
            <div>
                <Counter
                    labelContent="Ilość rat"
                    name="paymentsCount"
                    onChangeValue={counterClickedHandler}
                    value={paymentsCount}
                    maxValue={config.payments.maxCount}
                    minValue={config.payments.minCount}
                />
            </div>
        </CalculatorWrapper>
    );
};

export default Calculator;
