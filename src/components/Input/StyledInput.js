import styled from "styled-components";

export const StyledInput = styled.input`
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  border: none;
  border-bottom: 1px solid #a98dd0;
  outline: none;
  margin: 1rem;
  font-size: 1.2rem;
  padding: 0.5rem;
  &:focus {
    border-bottom: 1px solid cyan;
  }
`;
