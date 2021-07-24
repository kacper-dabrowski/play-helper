import styled from 'styled-components';

export const StyledDateInput = styled.input`
    width: 9rem;
    max-height: 40px;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font: inherit;
    font-size: 0.9rem;
    padding: 0.5rem;
    border-radius: 20px;
    background-color: #b3b3b3;
    border: none;

    &:invalid {
        color: transparent;
        background-color: #fa7f72;
    }
`;
