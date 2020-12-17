import React from "react";
import Button from "../../../../components/Button/Button";
import DateInput from "../../../../components/DateInput/DateInput";
import config from "../../../../shared/identifiers";

const TypeSection = ({ typeSetHandler, dateSetHandler, date, setting }) => (
  <>
    <Button
      title={"Biznesowy"}
      onClick={() => typeSetHandler(config.type.business)}
      active={setting === config.type.business}
    />
    <DateInput
      required
      onChange={(event) => dateSetHandler(event.target.value)}
      value={date}
    />
    <Button
      title={"Indywidualny"}
      onClick={() => typeSetHandler(config.type.individual)}
      active={setting === config.type.individual}
    />
  </>
);

export default TypeSection;
