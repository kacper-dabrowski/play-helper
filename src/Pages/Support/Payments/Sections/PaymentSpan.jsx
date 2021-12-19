import React from 'react';
import { BillingPeriodCode, Project } from '../../../../shared/identifiers';
import { PaymentButtonContainer } from '../StyledPayments';
import { StateButton } from '../../../../components/Buttons/StateButton/StateButton';

const PaymentSpan = ({ setting, setHandler }) => (
    <PaymentButtonContainer>
        <StateButton
            variant={Project.Support}
            title="P01"
            onClick={() => setHandler(BillingPeriodCode.P01)}
            active={setting === BillingPeriodCode.P01}
        />
        <StateButton
            variant={Project.Support}
            title="P06"
            onClick={() => setHandler(BillingPeriodCode.P06)}
            active={setting === BillingPeriodCode.P06}
        />
        <StateButton
            variant={Project.Support}
            title="P10"
            onClick={() => setHandler(BillingPeriodCode.P10)}
            active={setting === BillingPeriodCode.P10}
        />
        <StateButton
            variant={Project.Support}
            title="P15"
            onClick={() => setHandler(BillingPeriodCode.P15)}
            active={setting === BillingPeriodCode.P15}
        />
        <StateButton
            variant={Project.Support}
            title="P20"
            onClick={() => setHandler(BillingPeriodCode.P20)}
            active={setting === BillingPeriodCode.P20}
        />
        <StateButton
            variant={Project.Support}
            title="P25"
            onClick={() => setHandler(BillingPeriodCode.P25)}
            active={setting === BillingPeriodCode.P25}
        />
    </PaymentButtonContainer>
);

export default PaymentSpan;
