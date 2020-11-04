import React from "react";
import { StyledInvoice } from "./StyledInvoice";

const Invoice = (props) => {
  return (
    <StyledInvoice>
      <p>{props.invoiceNumber}</p>
      <p>{props.invoiceAmount}</p>
      <button>x</button>
    </StyledInvoice>
  );
};

export default Invoice;
