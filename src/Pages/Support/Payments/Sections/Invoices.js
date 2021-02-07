import React from 'react';
import Invoice from '../../../../components/Invoice/Invoice';
import { InvoicesContainer } from '../StyledPayments';

const Invoices = (props) => {
    return (
        <InvoicesContainer>
            {props.invoices.map((element) => (
                <Invoice
                    key={element}
                    invoiceNumber={element}
                    onRemoveInvoice={() => props.removeInvoiceHandler(element)}
                />
            ))}
        </InvoicesContainer>
    );
};

export default Invoices;
