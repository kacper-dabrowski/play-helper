import React from "react";
import Button from "../../../../components/Button/Button";
import DateInput from "../../../../components/DateInput/DateInput";

const TypeSection = () => (
  <>
    <Button title={"Biznesowy"} />
    <DateInput required={true} />
    <Button title={"Indywidualny"} />
  </>
);

export default TypeSection;
