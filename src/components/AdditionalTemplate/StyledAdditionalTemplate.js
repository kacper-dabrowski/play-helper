import styled from "styled-components";
import Button from "../Button/Button";

export const StyledAdditionalTemplate = styled(Button)`
  background-color: ${({ enabled }) => (enabled ? "#28abb9" : "#fa7f72")};
  margin: 1rem auto;
  color: white;
  text-align: center;
  min-width: 60%;
  &:hover {
    background-color: ${({ enabled }) => (enabled ? "#2d6187" : "#bb2205")};
  }
`;
