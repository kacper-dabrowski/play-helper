import React from "react";
import { StyledAdditionalTemplate } from "./StyledAdditionalTemplate";
import CopyToClipboard from "react-copy-to-clipboard";

const AdditionalTemplate = ({ enabled, title, template }) => {
  return (
    <CopyToClipboard text={template}>
      <StyledAdditionalTemplate enabled={enabled}>
        {title}
      </StyledAdditionalTemplate>
    </CopyToClipboard>
  );
};

export default AdditionalTemplate;
