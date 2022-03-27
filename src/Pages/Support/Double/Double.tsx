import { useFormik } from 'formik';
import React, { FC, useCallback, useEffect, useState } from 'react';
import ConfirmButtons from '../../../components/Buttons/ConfirmButtons/ConfirmButtons';
import { MainTextarea } from '../../../components/Inputs/MainTextarea/MainTextarea';
import SexSection from '../../../components/SexSection/SexSection';
import { toastProvider } from '../../../libs/toast';
import { generateClosedDoubleTemplate } from '../../../modules/closedDouble/closedDouble';
import { generateOpenedDoubleTemplate } from '../../../modules/openedDouble/openedDouble';
import { CustomerGender, DoubledNotificationType } from '../../../shared/identifiers';
import InputSection from './Sections/InputSection';
import { DoubleContainer, StyledSexSection } from './StyledDouble';

interface DoubleFormProps {
    type: DoubledNotificationType;
}

const Double: FC<DoubleFormProps> = ({ type }) => {
    const formik = useFormik({
        initialValues: {
            sex: CustomerGender.NotSet,
            current: '',
            doubled: '',
        },

        onSubmit: (values) => {
            try {
                let currentTemplate;
                switch (type) {
                    case DoubledNotificationType.Opened:
                        currentTemplate = generateOpenedDoubleTemplate(values.current, values.doubled);
                        break;
                    case DoubledNotificationType.Closed:
                        currentTemplate = generateClosedDoubleTemplate(values.sex, values.current, values.doubled);
                        break;
                    default:
                        throw new Error('Invalid double type');
                }

                setTemplate(currentTemplate);
            } catch (error) {
                if (error instanceof Error) {
                    toastProvider.error(error.message);
                }
            }
        },
    });
    const [template, setTemplate] = useState('');

    const clearFields = useCallback(() => {
        formik.resetForm();
        setTemplate('');
        // disabled due to formik bug
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => clearFields(), [clearFields, type]);

    return (
        <>
            <DoubleContainer type={type}>
                {type === DoubledNotificationType.Closed && (
                    <StyledSexSection>
                        <SexSection
                            setting={formik.values.sex}
                            setHandler={(value) => formik.setFieldValue('sex', value)}
                        />
                    </StyledSexSection>
                )}

                <InputSection
                    current={formik.values.current}
                    doubled={formik.values.doubled}
                    setCurrentHandler={(value) => formik.setFieldValue('current', value)}
                    setDoubledHandler={(value) => formik.setFieldValue('doubled', value)}
                    type={type}
                />
                <ConfirmButtons onClearFields={clearFields} onGenerateTemplate={formik.handleSubmit} />
            </DoubleContainer>
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};
export default Double;
