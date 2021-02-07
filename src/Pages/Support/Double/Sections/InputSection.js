import React from 'react';
import Input from '../../../../components/Input/Input';
import config from '../../../../shared/identifiers';
import { StyledInputSection } from '../StyledDouble';

const InputSection = ({ type, doubled, current, setDoubledHandler, setCurrentHandler }) => {
    let secondInput;
    switch (type) {
        case config.double.closed:
            secondInput = (
                <Input
                    onChange={(event) => setDoubledHandler(event.target.value)}
                    value={doubled}
                    labelContent="Numer zgłoszenia zamkniętego"
                />
            );
            break;
        case config.double.opened:
            secondInput = (
                <Input
                    onChange={(event) => setDoubledHandler(event.target.value)}
                    value={doubled}
                    labelContent="Numer zgłoszenia otwartego"
                />
            );
            break;
        default:
            throw new Error('Double type is invalid');
    }
    return (
        <StyledInputSection>
            <Input
                onChange={(event) => setCurrentHandler(event.target.value)}
                value={current}
                labelContent="Number zgłoszenia bieżącego"
            />
            {secondInput}
        </StyledInputSection>
    );
};

export default InputSection;
