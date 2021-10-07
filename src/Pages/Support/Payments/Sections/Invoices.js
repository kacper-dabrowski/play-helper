import React from 'react';
import Invoice from '../../../../components/Invoice/Invoice';
import { InvoicesContainer } from '../StyledPayments';

const Invoices = ({ invoices, removeInvoiceHandler }) => {
    const invoicesToComponents = invoices.map((invoiceNumber) => (
        <Invoice
            key={invoiceNumber}
            invoiceNumber={invoiceNumber}
            onRemoveInvoice={() => removeInvoiceHandler(invoiceNumber)}
        />
    ));

    return <InvoicesContainer>{invoicesToComponents}</InvoicesContainer>;
};

export default Invoices;
