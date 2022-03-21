import { Box, VStack } from '@chakra-ui/react';
import React, { ChangeEventHandler, FC } from 'react';
import Counter from '../../../../components/Counter/Counter';
import SupportInput from '../../../../components/Inputs/SupportInput/SupportInput';
import config from '../../../../shared/identifiers';

interface CalculatorProps {
    paymentsCount: number;
    amount: number;
    setPaymentsCountHandler: React.Dispatch<React.SetStateAction<number>>;
    setAmountHandler: (value: number) => void;
    setInvoiceHandler: ChangeEventHandler<HTMLInputElement>;
    onRemoveInvoice: (invoiceNumber: number) => void;
}

const Calculator: FC<CalculatorProps> = ({
    paymentsCount,
    amount,
    setPaymentsCountHandler,
    setAmountHandler,
    setInvoiceHandler,
}) => {
    const counterClickedHandler = (currentValue: number, minValue: number, maxValue: number) => {
        if (currentValue === maxValue) return setPaymentsCountHandler(minValue);
        if (currentValue >= minValue) return setPaymentsCountHandler((cur) => cur + 1);
        throw new Error('Błąd podczas przekazywania wartości licznika');
    };

    return (
        <VStack>
            <Box>
                <SupportInput
                    labelContent="Kwota do rozłozenia"
                    name="amount"
                    type="number"
                    onChange={(event) => setAmountHandler(Number(event.target.value))}
                    value={amount ? amount : ''}
                />
            </Box>
            <Box>
                <SupportInput labelContent="Numery faktur" onChange={(event) => setInvoiceHandler(event)} />
            </Box>
            <Box>
                <Counter
                    labelContent="Ilość rat"
                    name="paymentsCount"
                    onChangeValue={counterClickedHandler}
                    value={paymentsCount}
                    maxValue={config.payments.maxCount}
                    minValue={config.payments.minCount}
                />
            </Box>
        </VStack>
    );
};

export default Calculator;
