import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${({ theme }) => theme.spacing.medium};
`;
