import styled from 'styled-components';
interface TextAreaProps {
    hasErrors: boolean;
}

export const StyledFormTextarea = styled.textarea<TextAreaProps>`
    width: 80%;
    height: 6rem;
    background-color: rgba(0, 0, 0, 0.9);
    border: none;
    color: ${({ theme }) => theme.fontColor.primary};
    padding: ${({ theme }) => theme.spacing.small};
    font-size: 1.1rem;
    resize: none;
    margin-top: ${({ theme }) => theme.spacing.small};
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
        background-color: ${({ theme }) => theme.fontColor.primary};
    }
`;
