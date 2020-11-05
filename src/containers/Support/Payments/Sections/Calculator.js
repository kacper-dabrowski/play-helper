import React from "react";
import PaymentsInput from "../../../../components/PaymentsInput/PaymentsInput";
import { PaymentsInputWrapper } from "../../../../components/PaymentsInput/StyledPaymentsInput";

const Calculator = () => {
  return (
    <div>
      <PaymentsInputWrapper>
        <label>Kwota do rozłozenia</label>
        <PaymentsInput />
      </PaymentsInputWrapper>
      <PaymentsInputWrapper>
        <label>Kwoty rat</label>
        <PaymentsInput />
      </PaymentsInputWrapper>
      <PaymentsInputWrapper>
        <label>Numery faktur</label>
        <PaymentsInput />
      </PaymentsInputWrapper>
    </div>
  );
};

export default Calculator;
