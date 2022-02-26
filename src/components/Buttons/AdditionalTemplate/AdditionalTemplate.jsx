import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toastProvider } from '../../../libs/toast';
import { StyledAdditionalTemplate } from './StyledAdditionalTemplate';

const AdditionalTemplate = ({ enabled, title, template }) => {
    return (
        <CopyToClipboard
            onCopy={() => enabled && toastProvider.success('Pomyślnie skopiowano formatkę')}
            text={template}
        >
            <StyledAdditionalTemplate enabled={enabled}>{title}</StyledAdditionalTemplate>
        </CopyToClipboard>
    );
};

export default AdditionalTemplate;
