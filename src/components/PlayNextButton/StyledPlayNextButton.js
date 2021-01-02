import styled from "styled-components";

export const StyledPlayNextButton = styled.button`
  font-size: 1.1rem;
  width: 10rem;
  height: 2.5rem;
  margin: 0.5rem 0.5rem;
  border: none;
  border-radius: 21px;
  background-color: #b3b3b3;
  transition: ease-in-out 0.2s;
  &:hover {
    background-color: #f7be16;
    transform: scale(1.1);
    cursor: pointer;
  }
`;
