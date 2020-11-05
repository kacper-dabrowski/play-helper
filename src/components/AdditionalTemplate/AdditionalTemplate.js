import React from "react";
import { StyledAdditionalTemplate } from "./StyledAdditionalTemplate";

const AdditionalTemplate = (props) => (
  <StyledAdditionalTemplate enabled={props.enabled} title={props.title} />
);

export default AdditionalTemplate;
