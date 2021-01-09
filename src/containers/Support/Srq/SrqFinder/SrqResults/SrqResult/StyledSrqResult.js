import styled from "styled-components";

export const StyledSrqResultContainer = styled.div`
  width: 100%;
  max-height: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 1rem auto;
  border: 1px solid white;
  transition: ease-in-out 0.2s;
  border-radius: 5px;

  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;
