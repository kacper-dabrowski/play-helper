import styled from "styled-components";

export const StyledFormTextarea = styled.textarea`
  width: 80%;
  height: 6rem;
  background-color: rgba(0, 0, 0, 0.9);
  border: none;
  padding: 0;
  color: white;
  padding: 0.5rem;
  font-size: 0.8rem;
  resize: none;
  margin-top: 0.5rem;
  border-bottom: 2px solid #180f25;
  transition: ease-in-out 0.2s;
  font-family: inherit;
  &:focus,
  &:hover {
    border-bottom: 2px solid #009688;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: white;
  }
`;
