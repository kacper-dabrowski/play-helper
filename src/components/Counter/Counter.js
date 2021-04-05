import React from 'react';
import { CounterButton, CounterWrapper } from './StyledCounter';

const Counter = ({ onChangeValue, labelContent, minValue, maxValue, value }) => {
    return (
        <CounterWrapper>
            <label>{labelContent}</label>
            <CounterButton onClick={() => onChangeValue(value, minValue, maxValue)}>{value}</CounterButton>
        </CounterWrapper>
    );
};

export default Counter;
