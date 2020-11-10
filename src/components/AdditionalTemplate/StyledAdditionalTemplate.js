import styled from "styled-components";

export const StyledAdditionalTemplate = styled.button`
  background-color: ${({ enabled }) => (enabled ? "#28abb9" : "#fa7f72")};
  margin: 1rem auto;
  color: white;
  text-align: center;
  min-width: 60%;
  width: 9rem;
  font-size: 1.2rem;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 20px;
  border: none;
  transition: ease-in-out 0.2s;

  &:hover {
    background-color: ${({ enabled }) => (enabled ? "#2d6187" : "#bb2205")};
    cursor: pointer;
  }
`;
