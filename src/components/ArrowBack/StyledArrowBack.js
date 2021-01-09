import { Link } from "react-router-dom";
import styled from "styled-components";
import nextArrow from "../../assets/icons/next-back-arrow.svg";
import supportArrow from "../../assets/icons/support-back-arrow.svg";

const chooseArrow = (props) => {
  return props.type === "NEXT" ? nextArrow : supportArrow;
};
export const StyledArrowBack = styled(Link)`
  margin: 1rem;
  width: 3rem;
  height: 3rem;
  background-image: url(${(props) => chooseArrow(props)});
  background-size: cover;
`;
