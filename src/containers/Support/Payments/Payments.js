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
import Big from "big.js";

const Payments = () => {
  const [paymentSpan, setPaymentSpan] = useState(null);
  const [amount, setAmount] = useState("");
  const [payments, setPayments] = useState([]);
  const [paymentsCount, setPaymentsCount] = useState(config.payments.minCount);
  const [invoices, setInvoices] = useState([]);

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

    const amountDivided = new Big(amount).div(paymentsCount).toFixed(2);

    let amountsArray = [];

    for (let i = 0; i < paymentsCount; i++) {
      amountsArray.push(Number(amountDivided));
    }
    const isRoundCorrect = Number(amountDivided) * 3 === amount;

    if (!isRoundCorrect) {
      const difference = Number(amount - Number(amountDivided) * paymentsCount);
      amountsArray[0] += difference;
    }
    setPayments(amountsArray);
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
        <AdditionalTemplate title={"Formatka ratalna"} />
        <ButtonsContainer>
          <ConfirmButton
            onClick={() =>
              console.log(
                paymentSpan,
                amount,
                paymentsCount,
                invoices,
                "AMT: ",
                onDivideAmount(amount)
              )
            }
          />
          <ClearButton />
        </ButtonsContainer>
      </PaymentsContainer>
      <MainTextarea />
    </>
  );
};

export default Payments;
