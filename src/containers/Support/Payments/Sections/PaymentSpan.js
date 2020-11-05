import React from "react";
import Button from "../../../../components/Button/Button";
import { PaymentButtonContainer } from "../StyledPayments";

const PaymentSpan = () => {
  return (
    <div>
      <PaymentButtonContainer>
        <Button title={"P01"} />
        <Button title={"P06"} />
        <Button title={"P10"} />
        <Button title={"P15"} />
        <Button title={"P20"} />
        <Button title={"P25"} />
      </PaymentButtonContainer>
    </div>
  );
};

export default PaymentSpan;
