import React from 'react';
import { StyledCheckbox } from './StyledCheckbox';

const Checkbox = ({ labelContent, setHandler, value }, ...props) => (
    <>
        {labelContent && <label htmlFor={props.name}>{labelContent}</label>}
        <StyledCheckbox
            type="checkbox"
            name={props.name}
            {...props}
            onChange={(event) => setHandler(event.target.checked)}
            value={value}
        />
    </>
);

export default Checkbox;
