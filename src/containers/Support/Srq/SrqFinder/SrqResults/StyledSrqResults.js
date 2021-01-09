import styled from "styled-components";

export const StyledSrqResults = styled.div`
  width: 80%;
  height: 80%;
  padding: 1rem 4px 1rem 1rem;
  border-radius: 21px;
  background-color: rgba(34, 40, 49, 0.9);
  overflow-y: scroll;
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: white;
  }
`;
