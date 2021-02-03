import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StyledErrorBadge } from './StyledErrorBadge';

const ErrorBadge = ({ message, deleteError }) => {
    if (message && deleteError) {
        setTimeout(() => {}, 2000);
    }

    return ReactDOM.createPortal(
        <AnimatePresence>
            {message && (
                <StyledErrorBadge as={motion.div} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <span>{message}</span>
                </StyledErrorBadge>
            )}
        </AnimatePresence>,
        document.getElementById('modal-portal')
    );
};

export default ErrorBadge;
