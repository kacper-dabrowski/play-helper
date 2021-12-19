import React from 'react';
import { CounterButton, CounterWrapper } from './StyledCounter';

const Counter = ({ onChangeValue, labelContent, minValue, maxValue, value }) => (
    <CounterWrapper>
        <label htmlFor="counter">{labelContent}</label>
        <CounterButton name="counter" onClick={() => onChangeValue(value, minValue, maxValue)}>
            {value}
        </CounterButton>
    </CounterWrapper>
);

export default Counter;
