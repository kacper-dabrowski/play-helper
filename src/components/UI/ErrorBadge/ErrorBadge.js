import React from "react";
import { StyledErrorBadge } from "./StyledErrorBadge";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
const ErrorBadge = ({ message, deleteError }) => {
  if (message) {
    setTimeout(() => {
      deleteError();
    }, 2000);
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {message && (
        <StyledErrorBadge
          as={motion.div}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span>{message}</span>
        </StyledErrorBadge>
      )}
    </AnimatePresence>,
    document.getElementById("modal-portal")
  );
};

export default ErrorBadge;
