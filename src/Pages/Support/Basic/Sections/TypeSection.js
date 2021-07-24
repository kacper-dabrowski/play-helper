import React from 'react';
import DateInput from '../../../../components/Inputs/DateInput/DateInput';
import config from '../../../../shared/identifiers';
import { StateButton } from '../../../../components/Buttons/StateButton/StateButton';

const TypeSection = ({ typeSetHandler, dateSetHandler, date, setting }) => (
    <>
        <StateButton
            variant={config.projects.SUPPORT}
            title="Biznesowy"
            onClick={() => typeSetHandler(config.type.business)}
            active={setting === config.type.business}
        />
        <DateInput required onChange={(event) => dateSetHandler(event.target.value)} value={date} />
        <StateButton
            variant={config.projects.SUPPORT}
            title="Indywidualny"
            onClick={() => typeSetHandler(config.type.individual)}
            active={setting === config.type.individual}
        />
    </>
);

export default TypeSection;
