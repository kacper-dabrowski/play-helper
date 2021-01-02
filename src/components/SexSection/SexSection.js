import React from "react";
import Button from "../SupportButton/StyledSupportButton";
import config from "../../shared/identifiers";

const SexSection = ({ setHandler, setting }) => (
  <>
    <Button
      title={"Mężczyzna"}
      active={setting === config.sex.man}
      onClick={() => setHandler(config.sex.man)}
    />
    <Button
      title={"Kobieta"}
      active={setting === config.sex.woman}
      onClick={() => setHandler(config.sex.woman)}
    />
    <Button
      title={"Spółka"}
      active={setting === config.sex.company}
      onClick={() => setHandler(config.sex.company)}
    />
  </>
);

export default SexSection;
