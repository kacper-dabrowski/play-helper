import React from 'react';
import Invoice from '../../../../components/Invoice/Invoice';

const Invoices = ({ invoices, removeInvoiceHandler }) => {
    const invoicesToComponents = invoices.map((invoiceNumber) => (
        <Invoice
            key={invoiceNumber}
            invoiceNumber={invoiceNumber}
            onRemoveInvoice={() => removeInvoiceHandler(invoiceNumber)}
        />
    ));

    return invoicesToComponents;
};

export default Invoices;
