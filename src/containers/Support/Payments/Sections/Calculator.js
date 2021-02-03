import React from 'react';
import Counter from '../../../../components/Counter/Counter';
import PaymentsInput from '../../../../components/PaymentsInput/PaymentsInput';
import { PaymentsInputWrapper } from '../../../../components/PaymentsInput/StyledPaymentsInput';
import config from '../../../../shared/identifiers';

const Calculator = (props) => {
    const counterClickedHandler = (currentValue, minValue, maxValue) => {
        if (currentValue === maxValue) return props.setPaymentsCountHandler(minValue);
        if (currentValue >= minValue) return props.setPaymentsCountHandler((cur) => cur + 1);
        throw new Error('Błąd podczas przekazywania wartości licznika');
    };

    return (
        <div>
            <PaymentsInputWrapper>
                <label>Kwota do rozłozenia</label>
                <PaymentsInput
                    name="amount"
                    type="number"
                    onChange={(event) => props.setAmountHandler(Number(event.target.value))}
                    value={props.amount ? props.amount : ''}
                />
            </PaymentsInputWrapper>
            <PaymentsInputWrapper>
                <label>Ilość rat</label>
                <Counter
                    name="paymentsCount"
                    onChangeValue={counterClickedHandler}
                    value={props.paymentsCount}
                    maxValue={config.payments.maxCount}
                    minValue={config.payments.minCount}
                />
            </PaymentsInputWrapper>
            <PaymentsInputWrapper>
                <label>Numery faktur</label>
                <PaymentsInput onChange={(event) => props.setInvoiceHandler(event)} />
            </PaymentsInputWrapper>
        </div>
    );
};

export default Calculator;
