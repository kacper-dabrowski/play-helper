import React from 'react';
import { TextAreaWrapper } from '../StyledBasic';

const TextAreaSection = ({ general, details, generalSetHandler, detailsSetHandler }) => (
    <TextAreaWrapper>
        <TextArea
            placeholder="które dotyczyło..."
            onChange={(event) => generalSetHandler(event.target.value)}
            value={general}
        />
        <TextArea
            placeholder="uprzejmie informuję, że... "
            onChange={(event) => detailsSetHandler(event.target.value)}
            value={details}
        />
    </TextAreaWrapper>
);

export default TextAreaSection;
