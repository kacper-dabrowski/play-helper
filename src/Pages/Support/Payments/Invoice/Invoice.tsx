import { DeleteIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Tag } from '@chakra-ui/react';
import React, { FC } from 'react';

interface InvoiceProps {
    invoiceNumber: string;
    onRemoveInvoice: () => void;
}

const Invoice: FC<InvoiceProps> = ({ invoiceNumber, onRemoveInvoice }) => {
    return (
        <HStack display="flex">
            <Tag colorScheme={'purple'}>{invoiceNumber}</Tag>
            <IconButton
                aria-label="delete"
                onClick={onRemoveInvoice}
                size="sm"
                colorScheme={'transparent'}
                icon={<DeleteIcon color={'red'} />}
            />
        </HStack>
    );
};

export default Invoice;
