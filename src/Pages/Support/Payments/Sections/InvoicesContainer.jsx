import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Invoices from './Invoices';
import * as Styled from '../StyledPayments';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import cancelIcon from '../../../../assets/icons/cancel.svg';
import IconButton from '../../../../components/Buttons/IconButton/IconButton';
import { flyFromLeft } from '../../../../shared/animations/animations';

const InvoicesContainer = ({ isOpened, invoices, removeInvoiceHandler, closeHandler }) => {
    useEffect(() => {
        if (invoices.length === 0) {
            closeHandler();
        }
    }, [closeHandler, invoices.length]);

    return (
        <AnimatePresence>
            {isOpened ? (
                <>
                    <Backdrop isOpened={isOpened} closeHandler={closeHandler} />
                    <Styled.InvoicesTips isVisible={isOpened} as={motion.div} {...flyFromLeft()}>
                        <IconButton
                            src={cancelIcon}
                            onClick={closeHandler}
                            width="1.5rem"
                            height="1.5rem"
                            top="1rem"
                            right="1rem"
                        />
                        <Invoices invoices={invoices} removeInvoiceHandler={removeInvoiceHandler} />
                    </Styled.InvoicesTips>
                </>
            ) : null}
        </AnimatePresence>
    );
};

export default InvoicesContainer;
