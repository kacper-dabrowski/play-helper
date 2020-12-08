import React from "react";
import { StyledAdditionalTemplate } from "./StyledAdditionalTemplate";

const AdditionalTemplate = ({ enabled, title, onGenerateTemplate }) => (
  <StyledAdditionalTemplate
    enabled={enabled}
    onClick={() => onGenerateTemplate()}
  >
    {title}
  </StyledAdditionalTemplate>
);

export default AdditionalTemplate;
