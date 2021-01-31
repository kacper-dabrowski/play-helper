import styled from "styled-components";

export const StyledFormInput = styled.input`
  position: relative;
  width: 80%;
  height: 2rem;
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 1.1.rem;
  color: white;
  border: none;
  padding: 0.5rem;
  margin: 0.5rem auto;
  border-bottom: 1px solid ${({ hasErrors }) => (hasErrors ? "red" : "#835cbc")};
  transition: ease-in-out 0.2s;
  &:focus,
  &:hover {
    border-bottom: 2px solid #009688;
  }
`;
