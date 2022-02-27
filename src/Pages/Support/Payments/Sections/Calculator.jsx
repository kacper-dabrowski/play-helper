import React from 'react';
import Counter from '../../../../components/Counter/Counter';
import SupportInput from '../../../../components/Inputs/SupportInput/SupportInput';
import config from '../../../../shared/identifiers';
import { CalculatorWrapper } from '../StyledPayments';
import { SubmitButton } from '../../../../components/Buttons/SubmitButton/SubmitButton';

const Calculator = (props) => {
    const counterClickedHandler = (currentValue, minValue, maxValue) => {
        if (currentValue === maxValue) return props.setPaymentsCountHandler(minValue);
        if (currentValue >= minValue) return props.setPaymentsCountHandler((cur) => cur + 1);
        throw new Error('Błąd podczas przekazywania wartości licznika');
    };

    return (
        <CalculatorWrapper>
            <div>
                <SupportInput
                    labelContent="Kwota do rozłozenia"
                    name="amount"
                    type="number"
                    onChange={(event) => props.setAmountHandler(Number(event.target.value))}
                    value={props.amount ? props.amount : ''}
                />
            </div>
            <div>
                <SupportInput labelContent="Numery faktur" onChange={(event) => props.setInvoiceHandler(event)} />
                <p>Liczba faktur: {props.invoices.length}</p>
                <SubmitButton
                    disabled={!props.invoices.length}
                    onClick={props.openOverlayHandler}
                    title="Zobacz listę faktur"
                />
            </div>
            <div>
                <Counter
                    labelContent="Ilość rat"
                    name="paymentsCount"
                    onChangeValue={counterClickedHandler}
                    value={props.paymentsCount}
                    maxValue={config.payments.maxCount}
                    minValue={config.payments.minCount}
                />
            </div>
        </CalculatorWrapper>
    );
};

export default Calculator;
