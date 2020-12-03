import styled from "styled-components";

export const TopbarButton = styled.button`
  width: 5rem;
  height: 2rem;
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: 5px;
  border: 1px solid white;
  justify-self: center;
  color: white;
  transition: ease-in-out 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    color: black;
    background-color: white;
  }
`;
