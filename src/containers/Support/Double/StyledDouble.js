import styled from 'styled-components';

export const StyledInputSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 80px 80px;
    justify-items: center;
    align-content: center;
    width: 80%;
    & label {
        align-self: center;
        justify-self: end;
    }
`;

export const StyledSexSection = styled.div`
    display: grid;
    width: 80%;
    justify-content: center;
    align-items: center;
    grid-template-columns: 10rem 10rem 10rem;
    grid-template-rows: 100px;
`;
export const ConfirmButtonsWrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem 0;
`;
