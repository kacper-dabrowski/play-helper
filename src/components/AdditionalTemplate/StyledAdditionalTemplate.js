import styled from "styled-components";

export const StyledAdditionalTemplate = styled.button`
  background-color: ${({ enabled }) => (enabled ? "#399547" : "#fa7f72")};
  margin: 1rem auto;
  color: white;
  text-align: center;
  max-width: 100%;
  width: 15rem;
  font-size: 1.2rem;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 20px;
  border: none;
  transition: ease-in-out 0.2s;

  &:hover {
    background-color: ${({ enabled }) => (enabled ? "#399547" : "#bb2205")};
    cursor: ${({ enabled }) => (enabled ? "pointer" : "not-allowed")};
  }
`;
