import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const TopbarNavlink = styled(NavLink)`
  width: 7rem;
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: 5px;
  border: 1px solid white;
  justify-self: center;
  margin: 1rem;
  color: white;
  font-size: 1.1rem;
  transition: ease-in-out 0.2s;
  text-decoration: none;
  text-align: center;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    color: black;
    background-color: white;
  }
`;
