import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ConfirmButton from '../ConfirmButtons/ConfirmButton/ConfirmButton';
import { MainTextareaWrapper, StyledMainTextarea, TextAreaButtonsWrapper } from './StyledMainTextarea';

const MainTextarea = ({ setTemplate, value, ...props }) => (
    <MainTextareaWrapper>
        <StyledMainTextarea {...props} value={value} onChange={(event) => setTemplate(event.target.value)} />

        <TextAreaButtonsWrapper>
            <CopyToClipboard text={value}>
                <ConfirmButton title="Kopiuj" />
            </CopyToClipboard>
        </TextAreaButtonsWrapper>
    </MainTextareaWrapper>
);

export default MainTextarea;
