import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { StyledAdditionalTemplate } from './StyledAdditionalTemplate';

const AdditionalTemplate = ({ enabled, title, template }) => {
    return (
        <CopyToClipboard text={template}>
            <StyledAdditionalTemplate enabled={enabled}>{title}</StyledAdditionalTemplate>
        </CopyToClipboard>
    );
};

export default AdditionalTemplate;
