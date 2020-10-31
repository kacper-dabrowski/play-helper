import React from "react";
import ConfirmButtons from "./Sections/ConfirmButtons";
import ChannelSection from "./Sections/ChannelSection";
import SexSection from "./Sections/SexSection";
import { SettingsSection } from "./Sections/StyledSections";
import TextAreaSection from "./Sections/TextAreaSection";
import TypeSection from "./Sections/TypeSection";

const Basic = () => (
  <div>
    <SettingsSection>
      <SexSection />
      <ChannelSection />
      <TypeSection />
    </SettingsSection>
    <TextAreaSection />

    <ConfirmButtons />
  </div>
);

export default Basic;
