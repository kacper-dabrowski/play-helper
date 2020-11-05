import React from "react";
import IconButton from "../IconButton/IconButton";
import { StyledInvoice } from "./StyledInvoice";
import CancelIcon from "../../assets/icons/cancel.svg";
const Invoice = (props) => {
  return (
    <StyledInvoice>
      <p>{props.invoiceNumber}</p>
      <p>{props.invoiceAmount}</p>
      <IconButton src={CancelIcon} width={"2rem"} height={"2rem"} />
    </StyledInvoice>
  );
};

export default Invoice;
