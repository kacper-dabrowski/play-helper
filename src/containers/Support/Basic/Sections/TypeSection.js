import React from "react";
import Button from "../../../../components/Button/Button";
import DateInput from "../../../../components/DateInput/DateInput";
import config from "../../../../shared/settings";

const TypeSection = ({ typeSetHandler, dateSetHandler, date, type }) => (
  <>
    <Button
      title={"Biznesowy"}
      onClick={() => typeSetHandler(config.type.business)}
      active={type === config.type.business}
    />
    <DateInput
      required
      onChange={(event) => dateSetHandler(event.target.value)}
      value={date}
    />
    <Button
      title={"Indywidualny"}
      onClick={() => typeSetHandler(config.type.individual)}
      active={type === config.type.individual}
    />
  </>
);

export default TypeSection;
