import styled from 'styled-components';

export const StyledIcon = styled.img`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    transition: ease-in-out 0.2s;
    position: absolute;
    right: ${({ right }) => right};
    top: ${({ top }) => top};
    &:hover,
    &:active,
    &:focus {
        cursor: pointer;
        transform: scale(1.1);
    }
`;
