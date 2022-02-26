import React from 'react';
import config from '../../../../shared/identifiers';
import { StateButton } from '../../../../components/Buttons/StateButton/StateButton';

const ChannelSection = ({ setHandler, setting }) => (
    <>
        <StateButton
            variant={config.projects.SUPPORT}
            title="Infolinia"
            active={setting === config.channel.helpline}
            onClick={() => setHandler(config.channel.helpline)}
        />
        <StateButton
            variant={config.projects.SUPPORT}
            title="POS"
            active={setting === config.channel.pos}
            onClick={() => setHandler(config.channel.pos)}
        />
        <StateButton
            variant={config.projects.SUPPORT}
            title="Czat"
            active={setting === config.channel.chat}
            onClick={() => setHandler(config.channel.chat)}
        />
    </>
);

export default ChannelSection;
