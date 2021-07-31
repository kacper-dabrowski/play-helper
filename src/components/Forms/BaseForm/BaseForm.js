import styled from 'styled-components';

export const StyledFormHeader = styled.h2`
    font-size: 1.5rem;
    text-align: center;
    color: white;
    align-self: center;
`;

export const StyledBaseForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const TwoColumnFormLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-content: center;
`;
