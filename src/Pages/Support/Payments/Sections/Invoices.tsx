import { VStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import Invoice from '../Invoice/Invoice';

interface InvoicesProps {
    invoices: string[];
    removeInvoiceHandler: (invoiceNumber: string) => void;
}

const Invoices: FC<InvoicesProps> = ({ invoices, removeInvoiceHandler }) => {
    const invoicesToComponents = invoices.map((invoiceNumber) => (
        <Invoice
            key={invoiceNumber}
            invoiceNumber={invoiceNumber}
            onRemoveInvoice={() => removeInvoiceHandler(invoiceNumber)}
        />
    ));

    return <VStack>{invoicesToComponents}</VStack>;
};

export default Invoices;
