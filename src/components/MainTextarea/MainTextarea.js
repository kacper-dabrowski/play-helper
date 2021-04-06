import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import useFeedbackSnackbars from '../../hooks/useFeedbackSnackbars';
import ConfirmButton from '../Buttons/ConfirmButtons/ConfirmButton/ConfirmButton';
import { MainTextareaWrapper, StyledMainTextarea, TextAreaButtonsWrapper } from './StyledMainTextarea';

const MainTextarea = ({ setTemplate, value, ...props }) => {
    const [setSuccess] = useFeedbackSnackbars();
    return (
        <MainTextareaWrapper>
            <StyledMainTextarea {...props} value={value} onChange={(event) => setTemplate(event.target.value)} />
            <TextAreaButtonsWrapper>
                <CopyToClipboard text={value} onCopy={() => setSuccess('Pomyślnie skopiowano formatkę')}>
                    <ConfirmButton title="Kopiuj" />
                </CopyToClipboard>
            </TextAreaButtonsWrapper>
        </MainTextareaWrapper>
    );
};

export default MainTextarea;
