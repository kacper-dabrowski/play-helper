import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import useFeedbackSnackbars from '../../../hooks/useFeedbackSnackbars';
import { StyledAdditionalTemplate } from './StyledAdditionalTemplate';

const AdditionalTemplate = ({ enabled, title, template }) => {
    const [setSuccess] = useFeedbackSnackbars();
    return (
        <CopyToClipboard onCopy={() => enabled && setSuccess('Pomyślnie skopiowano formatkę')} text={template}>
            <StyledAdditionalTemplate enabled={enabled}>{title}</StyledAdditionalTemplate>
        </CopyToClipboard>
    );
};

export default AdditionalTemplate;
