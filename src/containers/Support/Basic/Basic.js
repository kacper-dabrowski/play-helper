import React from "react";
import ConfirmButtons from "./Sections/ConfirmButtons";
import ChannelSection from "./Sections/ChannelSection";
import SexSection from "./Sections/SexSection";
import TextAreaSection from "./Sections/TextAreaSection";
import TypeSection from "./Sections/TypeSection";
import { SettingsSection, CheckboxContainer } from "./StyledBasic";
import Checkbox from "../../../components/Checkbox/Checkbox";

const Basic = () => (
  <div>
    <SettingsSection>
      <SexSection />
      <ChannelSection />
      <TypeSection />
    </SettingsSection>
    <TextAreaSection />
    <CheckboxContainer>
      <Checkbox labelContent={"Zapytanie o ofertę"} />
    </CheckboxContainer>
    <ConfirmButtons />
  </div>
);

export default Basic;
