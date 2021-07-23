import styled from 'styled-components';

export const StyledInvoice = styled.div`
    width: 70%;
    height: 3rem;
    display: grid;
    position: relative;
    justify-content: center;
    align-items: center;
    grid-template-columns: 4fr 2fr 2fr;
    grid-template-rows: 3rem;
    margin: 0.5rem auto;
    background-color: #7046ab;
    box-shadow: 17px 10px 42px 0 rgba(0, 0, 0, 0.75);
    border-radius: 21px;
    & img {
        justify-self: flex-end;
        width: 1rem;
        height: 1rem;
        align-self: center;
        margin-right: 1rem;
    }
`;
