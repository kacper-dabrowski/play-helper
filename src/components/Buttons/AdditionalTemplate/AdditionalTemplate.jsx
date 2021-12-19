import cogoToast from 'cogo-toast';
import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { StyledAdditionalTemplate } from './StyledAdditionalTemplate';

const AdditionalTemplate = ({ enabled, title, template }) => (
    <CopyToClipboard onCopy={() => enabled && cogoToast.success('Pomyślnie skopiowano formatkę')} text={template}>
        <StyledAdditionalTemplate enabled={enabled}>{title}</StyledAdditionalTemplate>
    </CopyToClipboard>
);

export default AdditionalTemplate;
