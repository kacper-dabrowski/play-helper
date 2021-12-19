import React from 'react';
import { StateButton } from '../../../../components/Buttons/StateButton/StateButton';
import DateInput from '../../../../components/Inputs/DateInput/DateInput';
import { CustomerType, Project } from '../../../../shared/identifiers';

const TypeSection = ({ typeSetHandler, dateSetHandler, date, setting }) => (
    <>
        <StateButton
            variant={Project.Support}
            title="Biznesowy"
            onClick={() => typeSetHandler(CustomerType.Business)}
            active={setting === CustomerType.Business}
        />
        <DateInput
            required
            data-testid="basic-date-input"
            onChange={(event) => dateSetHandler(event.target.value)}
            value={date}
        />
        <StateButton
            variant={Project.Support}
            title="Indywidualny"
            onClick={() => typeSetHandler(CustomerType.Individual)}
            active={setting === CustomerType.Individual}
        />
    </>
);

export default TypeSection;
