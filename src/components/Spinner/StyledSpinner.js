import styled from 'styled-components';

export const SpinnerContainer = styled.div`
    ${({ isCentered }) =>
        isCentered
            ? `
  text-align:center;
  margin: 1rem auto;
  `
            : null}
`;
