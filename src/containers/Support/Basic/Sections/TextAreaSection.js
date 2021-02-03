import React from 'react';
import TextArea from '../../../../components/TextArea/TextArea';
import { TextAreaWrapper } from '../StyledBasic';

const TextAreaSection = ({ general, details, generalSetHandler, detailsSetHandler }) => (
    <TextAreaWrapper>
        <TextArea onChange={(event) => generalSetHandler(event.target.value)} value={general} />
        <TextArea onChange={(event) => detailsSetHandler(event.target.value)} value={details} />
    </TextAreaWrapper>
);

export default TextAreaSection;
