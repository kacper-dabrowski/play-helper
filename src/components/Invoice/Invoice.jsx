import React from 'react';
import IconButton from '../Buttons/IconButton/IconButton';
import { StyledInvoice } from './StyledInvoice';
import CancelIcon from '../../assets/icons/cancel.svg';

const Invoice = ({ invoiceNumber, invoiceAmount, onRemoveInvoice }) => (
    <StyledInvoice>
        <p>{invoiceNumber}</p>
        <p>{invoiceAmount}</p>
        <IconButton src={CancelIcon} width="2rem" height="2rem" right={0} onClick={onRemoveInvoice} />
    </StyledInvoice>
);

export default Invoice;
