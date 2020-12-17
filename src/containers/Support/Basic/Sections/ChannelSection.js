import React from "react";
import Button from "../../../../components/Button/Button";
import config from "../../../../shared/identifiers";

const ChannelSection = ({ setHandler, setting }) => (
  <>
    <Button
      title={"Infolinia"}
      active={setting === config.channel.helpline}
      onClick={() => setHandler(config.channel.helpline)}
    />
    <Button
      title={"POS"}
      active={setting === config.channel.pos}
      onClick={() => setHandler(config.channel.pos)}
    />
    <Button
      title={"Czat"}
      active={setting === config.channel.chat}
      onClick={() => setHandler(config.channel.chat)}
    />
  </>
);

export default ChannelSection;
