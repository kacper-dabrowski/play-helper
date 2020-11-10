import React from "react";
import { StyledAdditionalTemplate } from "./StyledAdditionalTemplate";

const AdditionalTemplate = ({ enabled, title, onGenerateTemplate }) => (
  <StyledAdditionalTemplate
    enabled={enabled}
    title={title}
    onClick={onGenerateTemplate}
  />
);

export default AdditionalTemplate;
