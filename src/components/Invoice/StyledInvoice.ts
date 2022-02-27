import styled from 'styled-components';

export const StyledInvoice = styled.div`
    width: 20rem;
    height: 3rem;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
