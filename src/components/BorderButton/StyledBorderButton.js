import styled from "styled-components";

export const StyledBorderButton = styled.button`
  width: 10rem;
  height: 2.5rem;
  border-radius: 21px;
  border: none;
  font-size: 1.1rem;
  color: black;
  background-color: ${(props) => props.btnColor};
  border: 2px solid ${(props) => props.btnColor};
  transition: ease-in-out 0.2s;
  &:hover {
    background-color: transparent;
    color: ${(props) => props.btnColor};

    cursor: pointer;
  }
`;
