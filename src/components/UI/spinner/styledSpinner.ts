import styled from '@emotion/styled';

interface SpinnerContainerProps {
    isCentered?: boolean;
}

export const SpinnerContainer = styled.div<SpinnerContainerProps>`
    ${({ isCentered, theme }) =>
        isCentered
            ? `
  text-align:center;
  margin:  ${theme.spacing.medium} auto;
  `
            : null}
`;
