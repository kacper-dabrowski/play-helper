import styled from "styled-components";

export const StyledDateInput = styled.input`
  width: 8rem;
  max-height: 40px;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 0;
  font: inherit;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 20px;
  background-color: #b3b3b3;
  border: none;
  &:invalid {
    color: transparent;
    background-color: #fa7f72;
  }
`;
