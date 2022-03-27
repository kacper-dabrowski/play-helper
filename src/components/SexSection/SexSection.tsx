import { FC } from 'react';
import { CustomerGender } from '../../shared/identifiers';
import { StateButton } from '../Buttons/StateButton/StateButton';

interface GenderSectionProps {
    setting: CustomerGender;
    setHandler: (value: CustomerGender) => void;
}

const SexSection: FC<GenderSectionProps> = ({ setHandler, setting }) => (
    <>
        <StateButton
            title="Mężczyzna"
            active={setting === CustomerGender.Man}
            onClick={() => setHandler(CustomerGender.Man)}
        />
        <StateButton
            title="Kobieta"
            active={setting === CustomerGender.Woman}
            onClick={() => setHandler(CustomerGender.Woman)}
        />
        <StateButton
            title="Spółka"
            active={setting === CustomerGender.Company}
            onClick={() => setHandler(CustomerGender.Company)}
        />
    </>
);

export default SexSection;
