import styled from 'styled-components';

export const StyledFormTextarea = styled.textarea`
  width: 80%;
  height: 6rem;
  background-color: rgba(0, 0, 0, 0.9);
  border: none;
  color: white;
  padding: 0.5rem;
  font-size: 1.1rem;
  resize: none;
  margin-top: 0.5rem;
  border-bottom: 1px solid ${({ hasErrors }) => (hasErrors ? 'red' : '#835cbc')};
    transition: ease-in-out 0.2s;
    font-family: inherit;
    &:hover,
    &:active,
    &:focus {
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
