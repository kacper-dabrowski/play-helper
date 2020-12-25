import styled from "styled-components";

export const StyledLoginInput = styled.input`
  width: 10rem;
  height: 2rem;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  margin: 1rem 1rem;
  border-bottom: 1px solid #835cbc;
  transition: ease-in-out 0.2s;
  &:focus {
    border-bottom: 1px solid #835cbc;
  }
`;
