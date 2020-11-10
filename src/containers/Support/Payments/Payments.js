import React from "react";
import Calculator from "./Sections/Calculator";
import Invoices from "./Sections/Invoices";
import PaymentSpan from "./Sections/PaymentSpan";
import { PaymentsContainer } from "./StyledPayments";
import ConfirmButton from "../../../components/ConfirmButton/ConfirmButton";
import ClearButton from "../../../components/ClearButton/ClearButton";
import { ButtonsContainer } from "./StyledPayments";
import AdditionalTemplate from "../../../components/AdditionalTemplate/AdditionalTemplate";
import MainTextarea from "../../../components/MainTextarea/MainTextarea";

const Payments = () => {
  return (
    <>
      <PaymentsContainer>
        <PaymentSpan />
        <Calculator />
        <Invoices />
        <AdditionalTemplate title={"Formatka ratalna"} />
        <ButtonsContainer>
          <ConfirmButton />
          <ClearButton />
        </ButtonsContainer>
      </PaymentsContainer>
      <MainTextarea />
    </>
  );
};

export default Payments;
