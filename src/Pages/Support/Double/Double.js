import React, { useCallback, useEffect, useState } from 'react';
import ConfirmButtons from '../../../components/Buttons/ConfirmButtons/ConfirmButtons';
import MainTextarea from '../../../components/MainTextarea/MainTextarea';
import SexSection from '../../../components/SexSection/SexSection';
import useFeedbackSnackbars from '../../../hooks/useFeedbackSnackbars';
import generateOpenedDoubleTemplate from '../../../modules/closedDouble/closedDouble';
import generateClosedDoubleTemplate from '../../../modules/openedDouble/openedDouble';
import config from '../../../shared/identifiers';
import InputSection from './Sections/InputSection';
import { StyledSexSection } from './StyledDouble';

const Double = ({ type }) => {
    const [sex, setSex] = useState('');
    const [current, setCurrent] = useState('');
    const [doubled, setDoubled] = useState('');
    const [template, setTemplate] = useState('');
    const [, setError] = useFeedbackSnackbars();

    const clearFields = useCallback(() => {
        setSex(null);
        setTemplate('');
        setDoubled('');
        setCurrent('');
    }, []);

    useEffect(() => clearFields(), [clearFields, type]);

    const generateTemplateHandler = useCallback(() => {
        try {
            let currentTemplate;
            switch (type) {
                case config.double.opened:
                    currentTemplate = generateOpenedDoubleTemplate(current, doubled);
                    break;
                case config.double.closed:
                    currentTemplate = generateClosedDoubleTemplate(sex, current, doubled);
                    break;
                default:
                    throw new Error('Invalid double type');
            }

            setTemplate(currentTemplate);
        } catch (error) {
            setError(error.message);
        }
    }, [type, doubled, current, sex]);

    return (
        <>
            <div>
                {type === config.double.closed && (
                    <StyledSexSection>
                        <SexSection setting={sex} setHandler={setSex} />
                    </StyledSexSection>
                )}

                <InputSection
                    current={current}
                    doubled={doubled}
                    setCurrentHandler={setCurrent}
                    setDoubledHandler={setDoubled}
                    type={type}
                />
                <ConfirmButtons onClearFields={clearFields} onGenerateTemplate={generateTemplateHandler} />
            </div>
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};
export default Double;
