import styled from "styled-components";

const applyColor = (props) =>
  props.isClicked ? props.secondColor : props.mainColor;

export const StyledBorderButton = styled.button`
  width: 10rem;
  height: 2.5rem;
  border-radius: 21px;
  border: none;
  font-size: 1.1rem;
  border: 2px solid ${(props) => applyColor(props)};
  color: ${(props) => applyColor(props)};
  background-color: transparent;
  transition: ease-in-out 0.2s;
  &:hover {
    background-color: ${(props) => applyColor(props)};
    color: black;
    cursor: pointer;
  }
`;
