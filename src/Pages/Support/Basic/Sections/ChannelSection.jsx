import React from 'react';
import { StateButton } from '../../../../components/Buttons/StateButton/StateButton';
import { ChannelType, Project } from '../../../../shared/identifiers';

const ChannelSection = ({ setHandler, setting }) => (
    <>
        <StateButton
            variant={Project.Support}
            title="Infolinia"
            active={setting === ChannelType.Helpline}
            onClick={() => setHandler(ChannelType.Helpline)}
        />
        <StateButton
            variant={Project.Support}
            title="POS"
            active={setting === ChannelType.Pos}
            onClick={() => setHandler(ChannelType.Pos)}
        />
        <StateButton
            variant={Project.Support}
            title="Czat"
            active={setting === ChannelType.Chat}
            onClick={() => setHandler(ChannelType.Chat)}
        />
    </>
);

export default ChannelSection;
