import { Link } from "react-router-dom";
import styled from "styled-components";
import nextArrow from "../../assets/icons/arrow-back-right.svg";
import supportArrow from "../../assets/icons/arrow-back-left.svg";

const chooseArrow = (props) => {
  return props.type === "NEXT" ? nextArrow : supportArrow;
};
export const StyledArrowBack = styled(Link)`
  margin: 1rem;
  width: 2rem;
  height: 2rem;
  background-image: url(${(props) => chooseArrow(props)});
  background-size: cover;
  transition: ease-in-out 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;
