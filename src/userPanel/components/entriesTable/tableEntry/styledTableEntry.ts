import styled from 'styled-components';

export const tableEntryContainer = styled.button`
    background-color: transparent;
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center;
    margin: 1rem auto;
    padding: ${({ theme }) => theme.spacing.small};
    border: 1px solid white;
    position: relative;
    transition: ease-in-out 0.2s;
    border-radius: 5px;
    padding: 1rem;
    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.fontColor.primary};
        color: black;
    }
`;

const iconContainer = styled.div`
    height: 100%;
    display: flex;
    padding: 1rem;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    position: absolute;
`;

export const controlsContainer = styled(iconContainer)`
    top: 0;
    right: 0;
`;

export const publicIconContainer = styled(iconContainer)`
    top: 0;
    left: 0;
    align-items: flex-start;
`;

interface IconButtonProps {
    src: string;
}

export const iconButton = styled.button<IconButtonProps>`
    width: 1.5rem;
    height: 1.5rem;
    background: url(${({ src }) => src});
    background-size: cover;
    border: none;
    cursor: pointer;
    transition: ease-in-out 0.2s;

    &:hover,
    &:focus {
        transform: scale(1.1);
    }
`;
