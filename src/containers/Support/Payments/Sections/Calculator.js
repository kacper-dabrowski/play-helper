import React, { useState } from "react";
import Counter from "../../../../components/Counter/Counter";
import PaymentsInput from "../../../../components/PaymentsInput/PaymentsInput";
import { PaymentsInputWrapper } from "../../../../components/PaymentsInput/StyledPaymentsInput";
import config from "../../../../shared/settings";

const Calculator = () => {
  const [paymentsCount, setPaymentsCount] = useState(config.payments.minCount);

  const counterClickedHandler = (currentValue, minValue, maxValue) => {
    if (currentValue === maxValue) return setPaymentsCount(minValue);
    if (currentValue >= minValue) return setPaymentsCount((cur) => cur + 1);
  };

  return (
    <div>
      <PaymentsInputWrapper>
        <label>Kwota do rozłozenia</label>
        <PaymentsInput />
      </PaymentsInputWrapper>
      <PaymentsInputWrapper>
        <label>Ilość rat</label>
        <Counter
          onChangeValue={counterClickedHandler}
          value={paymentsCount}
          maxValue={config.payments.maxCount}
          minValue={config.payments.minCount}
        />
      </PaymentsInputWrapper>
      <PaymentsInputWrapper>
        <label>Numery faktur</label>
        <PaymentsInput />
      </PaymentsInputWrapper>
    </div>
  );
};

export default Calculator;
