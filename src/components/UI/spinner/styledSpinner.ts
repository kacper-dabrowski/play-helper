import styled from 'styled-components';

interface SpinnerContainerProps {
    isCentered?: boolean;
}

export const SpinnerContainer = styled.div<SpinnerContainerProps>`
    ${({ isCentered }) =>
        isCentered
            ? `
  text-align:center;
  margin: 1rem auto;
  `
            : null}
`;
