import React from "react";
import Calculator from "./Sections/Calculator";
import Invoices from "./Sections/Invoices";
import PaymentSpan from "./Sections/PaymentSpan";
import { PaymentsContainer } from "./StyledPayments";
const Payments = () => {
  return (
    <PaymentsContainer>
      <PaymentSpan />
      <Calculator />
      <Invoices />
    </PaymentsContainer>
  );
};

export default Payments;
