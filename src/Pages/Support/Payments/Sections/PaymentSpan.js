import React from 'react';
import Button from '../../../../components/Buttons/SupportButton/StyledSupportButton';
import config from '../../../../shared/identifiers';
import { PaymentButtonContainer } from '../StyledPayments';

const PaymentSpan = ({ setting, setHandler }) => {
    return (
        <PaymentButtonContainer>
            <Button
                title="P01"
                onClick={() => setHandler(config.payments.spans.P01)}
                active={setting === config.payments.spans.P01}
            />
            <Button
                title="P06"
                onClick={() => setHandler(config.payments.spans.P06)}
                active={setting === config.payments.spans.P06}
            />
            <Button
                title="P10"
                onClick={() => setHandler(config.payments.spans.P10)}
                active={setting === config.payments.spans.P10}
            />
            <Button
                title="P15"
                onClick={() => setHandler(config.payments.spans.P15)}
                active={setting === config.payments.spans.P15}
            />
            <Button
                title="P20"
                onClick={() => setHandler(config.payments.spans.P20)}
                active={setting === config.payments.spans.P20}
            />
            <Button
                title="P25"
                onClick={() => setHandler(config.payments.spans.P25)}
                active={setting === config.payments.spans.P25}
            />
        </PaymentButtonContainer>
    );
};

export default PaymentSpan;
