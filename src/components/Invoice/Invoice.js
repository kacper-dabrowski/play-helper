import React from 'react';
import IconButton from '../Buttons/IconButton/IconButton';
import { StyledInvoice } from './StyledInvoice';
import CancelIcon from '../../assets/icons/cancel.svg';

const Invoice = (props) => {
    return (
        <StyledInvoice>
            <p>{props.invoiceNumber}</p>
            <p>{props.invoiceAmount}</p>
            <IconButton src={CancelIcon} width="2rem" height="2rem" right={0} onClick={props.onRemoveInvoice} />
        </StyledInvoice>
    );
};

export default Invoice;
