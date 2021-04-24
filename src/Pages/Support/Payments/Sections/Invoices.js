import React from 'react';
import Invoice from '../../../../components/Invoice/Invoice';
import { InvoicesContainer } from '../StyledPayments';

const Invoices = (props) => {
    const invoicesToComponents = props.invoices.map((invoiceNumber) => (
        <Invoice
            key={invoiceNumber}
            invoiceNumber={invoiceNumber}
            onRemoveInvoice={() => props.removeInvoiceHandler(invoiceNumber)}
        />
    ));

    return <InvoicesContainer>{invoicesToComponents}</InvoicesContainer>;
};

export default Invoices;
