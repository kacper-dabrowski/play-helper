import styled from "styled-components";

export const StyledSignupSubmitButton = styled.button`
  width: 10rem;
  height: 2rem;
  padding: 0.5rem;
  background: linear-gradient(45deg, #835cbc, #5b398d);
  border: none;
  border-radius: 5px;
  justify-self: center;
  color: white;
  transition: ease-in-out 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
