import cogoToast from 'cogo-toast';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ConfirmButton from '../../Buttons/ConfirmButtons/ConfirmButton/ConfirmButton';
import { MainTextareaWrapper, StyledMainTextarea, TextAreaButtonsWrapper } from './StyledMainTextarea';

const MainTextarea = ({ setTemplate, value, ...props }) => {
    return (
        <MainTextareaWrapper>
            <StyledMainTextarea {...props} value={value} onChange={(event) => setTemplate(event.target.value)} />
            <TextAreaButtonsWrapper>
                <CopyToClipboard text={value} onCopy={() => cogoToast.success('Pomyślnie skopiowano formatkę')}>
                    <ConfirmButton title="Kopiuj" />
                </CopyToClipboard>
            </TextAreaButtonsWrapper>
        </MainTextareaWrapper>
    );
};

export default MainTextarea;
