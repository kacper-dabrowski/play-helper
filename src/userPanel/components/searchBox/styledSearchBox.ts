import styled from 'styled-components';

export const searchBar = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 0.5rem;
    font-size: 1.2rem;
    height: 2.5rem;
    background-color: rgba(34, 40, 49, 0.9);
    border: none;
    border-bottom: 1px solid purple;
    transition: ease-in-out 0.2s;
    color: ${({ theme }) => theme.fontColor.primary}; ;
`;
export const inputWrapper = styled.div`
    width: 80%;
    margin: ${({ theme }) => theme.spacing.medium};
`;
