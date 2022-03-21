import styled from '@emotion/styled';

interface StyledIconProps {
    top: string;
    right: string;
}

export const StyledIcon = styled.img<StyledIconProps>`
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
