import React from 'react';
import ClearButton from './ClearButton/ClearButton';
import ConfirmButton from './ConfirmButton/ConfirmButton';
import * as Styled from './StyledConfirmButtons';

const ConfirmButtons = ({ onGenerateTemplate, onClearFields, confirmTitle }) => (
    <Styled.Wrapper>
        <ConfirmButton onClick={onGenerateTemplate} title={confirmTitle}/>
        <ClearButton onClick={onClearFields}/>
    </Styled.Wrapper>
);
export default ConfirmButtons;
