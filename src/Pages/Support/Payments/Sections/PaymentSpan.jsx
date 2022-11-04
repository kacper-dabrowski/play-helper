import React from 'react';
import config from '../../../../shared/identifiers';
import { PaymentButtonContainer } from '../StyledPayments';

const PaymentSpan = ({ setting, setHandler }) => {
    return (
        <PaymentButtonContainer>
            <StateButton
                variant={config.projects.SUPPORT}
                title="P01"
                onClick={() => setHandler(config.payments.spans.P01)}
                active={setting === config.payments.spans.P01}
            />
            <StateButton
                variant={config.projects.SUPPORT}
                title="P06"
                onClick={() => setHandler(config.payments.spans.P06)}
                active={setting === config.payments.spans.P06}
            />
            <StateButton
                variant={config.projects.SUPPORT}
                title="P10"
                onClick={() => setHandler(config.payments.spans.P10)}
                active={setting === config.payments.spans.P10}
            />
            <StateButton
                variant={config.projects.SUPPORT}
                title="P15"
                onClick={() => setHandler(config.payments.spans.P15)}
                active={setting === config.payments.spans.P15}
            />
            <StateButton
                variant={config.projects.SUPPORT}
                title="P20"
                onClick={() => setHandler(config.payments.spans.P20)}
                active={setting === config.payments.spans.P20}
            />
            <StateButton
                variant={config.projects.SUPPORT}
                title="P25"
                onClick={() => setHandler(config.payments.spans.P25)}
                active={setting === config.payments.spans.P25}
            />
        </PaymentButtonContainer>
    );
};

export default PaymentSpan;
