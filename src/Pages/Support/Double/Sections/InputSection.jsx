import { VStack } from '@chakra-ui/react';
import React from 'react';
import SupportInput from '../../../../components/Inputs/SupportInput/SupportInput';
import config from '../../../../shared/identifiers';

const InputSection = ({ type, doubled, current, setDoubledHandler, setCurrentHandler }) => {
    let secondInput;
    switch (type) {
        case config.double.closed:
            secondInput = (
                <SupportInput
                    onChange={(event) => setDoubledHandler(event.target.value)}
                    value={doubled}
                    labelContent="Numer zgłoszenia zamkniętego"
                    placeholder="Numer zamkniętego"
                />
            );
            break;
        case config.double.opened:
            secondInput = (
                <SupportInput
                    onChange={(event) => setDoubledHandler(event.target.value)}
                    value={doubled}
                    labelContent="Numer zgłoszenia otwartego"
                    placeholder="Numer otwartego zgłoszenia"
                />
            );
            break;
        default:
            throw new Error('Double type is invalid');
    }
    return (
        <VStack align={'center'} justify={'center'}>
            <SupportInput
                onChange={(event) => setCurrentHandler(event.target.value)}
                value={current}
                labelContent="Number bieżącego zgłoszenia"
                placeholder="Numer Twojego zgłoszenia"
            />
            {secondInput}
        </VStack>
    );
};

export default InputSection;
