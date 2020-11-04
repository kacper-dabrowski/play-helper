import React from "react";
import Invoice from "../../../../components/Invoice/Invoice";

const Invoices = () => {
  return (
    <div>
      <h2>Wybrane faktury:</h2>
      <Invoice invoiceNumber={123} invoiceAmount={(123.3).toFixed(2)} />
    </div>
  );
};

export default Invoices;
