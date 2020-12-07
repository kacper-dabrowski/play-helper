import React, { useState } from "react";
import Calculator from "./Sections/Calculator";
import Invoices from "./Sections/Invoices";
import PaymentSpan from "./Sections/PaymentSpan";
import { PaymentsContainer } from "./StyledPayments";
import ConfirmButton from "../../../components/ConfirmButton/ConfirmButton";
import ClearButton from "../../../components/ClearButton/ClearButton";
import { ButtonsContainer } from "./StyledPayments";
import AdditionalTemplate from "../../../components/AdditionalTemplate/AdditionalTemplate";
import MainTextarea from "../../../components/MainTextarea/MainTextarea";
import config from "../../../shared/settings";
import {
  generatePaymentsTemplate,
  generateAmountsArray,
} from "../../../modules/payments/payments";

const Payments = () => {
  const [paymentSpan, setPaymentSpan] = useState(null);
  const [amount, setAmount] = useState("");
  const [payments, setPayments] = useState([]);
  const [paymentsCount, setPaymentsCount] = useState(config.payments.minCount);
  const [invoices, setInvoices] = useState([]);
  const [template, setTemplate] = useState("");
  const [additionalTemplateActive, setAdditionalTemplateActive] = useState(
    false
  );

  const setInvoicesHandler = (event) => {
    if (invoices.length === config.payments.maxInvoices) {
      throw new Error(
        `Fakturę rozkładamy na maksymalnie ${config.payments.maxInvoices} raty`
      );
    }
    const invoiceString = event.target.value;
    const invoiceMatch = invoiceString.match(config.payments.invoiceRegex)?.[0];

    if (invoiceMatch && !invoices.includes(invoiceMatch)) {
      setInvoices((currentInvoices) => [...currentInvoices, invoiceMatch]);
      event.target.value = "";
    }
  };

  const onRemoveInvoice = (invoiceNumber) => {
    return setInvoices((currentInvoices) =>
      currentInvoices.filter((invoice) => invoice !== invoiceNumber)
    );
  };

  const onDivideAmount = (userInput) => {
    const amount = Number(userInput);

    if (Number.isNaN(amount) || amount === 0) {
      throw new Error("Została podana nieprawidłowa kwota do podziału na raty");
    }
    if (invoices.length <= 0 || invoices.length > 3) {
      throw new Error("Niepoprawna liczba faktur");
    }

    const amountsArray = generateAmountsArray(amount, paymentsCount);
    setPayments(amountsArray);
    const paymentsTemplate = generatePaymentsTemplate({
      name: "Alicja Wyczyńska",
      payments,
      invoices,
      paymentSpan,
    });
    setTemplate(paymentsTemplate);
    setAdditionalTemplateActive(true);
  };

  return (
    <>
      <PaymentsContainer>
        <PaymentSpan setting={paymentSpan} setHandler={setPaymentSpan} />
        <Calculator
          paymentsCount={paymentsCount}
          setPaymentsCountHandler={setPaymentsCount}
          amount={amount}
          setAmountHandler={setAmount}
          invoices={invoices}
          setInvoiceHandler={setInvoicesHandler}
        />
        <Invoices invoices={invoices} removeInvoiceHandler={onRemoveInvoice} />
        <AdditionalTemplate
          title={"Formatka ratalna"}
          enabled={additionalTemplateActive}
        />
        <ButtonsContainer>
          <ConfirmButton onClick={() => onDivideAmount(amount)} />
          <ClearButton />
        </ButtonsContainer>
      </PaymentsContainer>
      <MainTextarea value={template} />
    </>
  );
};

export default Payments;
