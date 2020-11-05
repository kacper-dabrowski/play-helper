import React from "react";
import Invoice from "../../../../components/Invoice/Invoice";
import { InvoicesContainer } from "../StyledPayments";

const Invoices = () => {
  return (
    <InvoicesContainer>
      <Invoice
        invoiceNumber={"F/123456789"}
        invoiceAmount={(123.3).toFixed(2)}
      />
      <Invoice
        invoiceNumber={"F/123456789"}
        invoiceAmount={(123.3).toFixed(2)}
      />
      <Invoice
        invoiceNumber={"F/123456789"}
        invoiceAmount={(123.3).toFixed(2)}
      />
    </InvoicesContainer>
  );
};

export default Invoices;
